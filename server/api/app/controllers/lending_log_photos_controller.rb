class LendingLogPhotosController < ApplicationController
    include ActionController::HttpAuthentication::Token::ControllerMethods
    before_action :authenticate

    require 'date'

    def index
        lendingLogPhotos = LendingLogPhoto.all

        lendingLogPhotos = lendingLogPhotos.as_json(methods: :image_url)

        render json: { status: 'SUCCESS', data: lendingLogPhotos }
    end

    def show
        lendingLogPhoto = LendingLogPhoto.find(params[:id])
        lendingLogPhoto = lendingLogPhoto.as_json(methods: :image_url)

        render json: { status: 'SUCCESS', data: lendingLogPhoto }
    end

    def getLentItemAsUser
        # ユーザーごとの貸出中備品の取得
        lendingLogPhotos = LendingLogPhoto.where(user_id: params[:userId], return_schedule_actual: nil)
        lendingLogPhotos = lendingLogPhotos.as_json(methods: :image_url)

        render json: { status: 'SUCCESS', data: lendingLogPhotos }
    end

    def create
        # 貸出登録
        lendingLogPhoto = LendingLogPhoto.new(
            user_id: params[:user_id],
            loan_date: Date.today,
            return_schedule: getExtensionDay(14, Date.today),
            image: params[:image]
        )

        if lendingLogPhoto.save
            render json: { status: 'SUCCESS', data: lendingLogPhoto }
        else
            render json: { status: 'ERROR', data: lendingLogPhoto.errors }
        end
    end

    def update
        # 返却登録
        
        # 返却記録を作成
        lendingLogPhoto = LendingLogPhoto.new(
            user_id: params[:user_id],
            loan_date: Date.today,
            return_schedule: getExtensionDay(14, Date.today),
            return_schedule_actual: Date.today,
            image: params[:image]
        )
        
        unless lendingLogPhoto.save
            render json: { status: 'ERROR', data: lendingLogPhoto.errors }
            return false
        end

        lendingLogPhoto = LendingLogPhoto.find(params[:id])

        # 貸出記録を更新
        if lendingLogPhoto.update(return_schedule_actual: Date.today)
            render json: { status: 'SUCCESS', data: lendingLogPhoto }
        else
            render json: { status: 'ERROR', data: lendingLogPhoto.errors }
        end
    end

    def extension
        # 貸出期間の延長登録
        lendingLogPhoto = LendingLogPhoto.find(params[:id])
        
        returnSchedule = getExtensionDay 14, lendingLogPhoto.return_schedule

        if lendingLogPhoto.update(return_schedule: returnSchedule)
            render json: { status: 'SUCCESS', data: lendingLogPhoto }
        else
            render json: { status: 'ERROR', data: lendingLogPhoto.errors }
        end
    end

    private
        def lendingLogPhoto_params
            params.permit(:user_id, :loan_date, :return_schedule, :return_schedule_actual, :image)
        end

        def getExtensionDay(_extensionPeriod, _baseDay)
            # 延長後の日付を取得

            # 現在の日付を取得
            toDay = _baseDay
            toDay = toDay.strftime("%Y-%m-%d")
            dayArr = toDay.split("-")
            dayY = dayArr[0].to_i; dayM = dayArr[1].to_i; dayD = dayArr[2].to_i;

            # 現在の月の月末を取得
            endMonth = Date.new(dayY, dayM, -1).strftime("%Y-%m-%d")
            endMonthArr = endMonth.split("-")
            endMonthD = endMonthArr[2].to_i

            # 延長計算
            extensionDay = dayD + _extensionPeriod
            if extensionDay > endMonthD
                extensionDay -= endMonthD
                dayM += 1
                if dayM == 13
                    dayY += 1
                    dayM = 1
                end
            end

            returnSchedule = dayY.to_s + "-" + dayM.to_s + "-" + extensionDay.to_s

            return returnSchedule.to_date
        end

        def authenticate
            # 認証
            authenticate_or_request_with_http_token do |token, options|
                auth_user = User.find_by(token: token)
                auth_user != nil ? true : false
            end
        end
end
