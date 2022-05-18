class LendingLogsController < ApplicationController
    include ActionController::HttpAuthentication::Token::ControllerMethods
    before_action :authenticate

    require 'date'

    def index
        # 貸出ログ全件取得
        data = LendingLog.all

        render json: { status: 'SUCCESS', data: data}
    end

    def getLentItem
        # 貸出中の備品を取得
        data = LendingLog.where(return_schedule_actual: nil)

        render json: { status: 'SUCCESS', data: data}
    end

    def getLentItemAsUser
        # ユーザーごとの貸し出し中備品を取得
        lendingLogs = LendingLog.where(user_id: params[:userId], return_schedule_actual: nil)

        data = [];
        equipmentArr = [];
        lendingLogArr = [];
        lendingLogs.each do |log|
            lendingLogArr.push(log);
            equipmentArr.push(log.equipment);
        end

        render json: { status: 'SUCCESS', data: { lendingLog: lendingLogArr, equipment: equipmentArr }}
    end

    def create
        # 貸出登録(書籍)
        equipment = Equipment.find_by(isbn: params[:isbn])

        if equipment.status == 0 then
            lendingLog = LendingLog.new(
                user_id: params[:user_id],
                equipment_id: equipment['id'],
                loan_date: Date.today,
                return_schedule: getExtensionDay(14, Date.today)
            )

            # 備品の状態を更新
            unless equipment.update(status: 2)
                render json: { status: 'ERROR', data: equipment.errors }
            end

            # 貸出記録を新規保存
            if lendingLog.save
                render json: { status: 'SUCCESS', data: lendingLog }
            else
                render json: { status: 'ERROR', data: lendingLog.errors }
            end
    
        else
            # 貸出中または、貸出不可の場合
            render json: { status: 'ERROR', data: {ms: "already rented or not rentable", data: equipment.lending_logs.where(return_schedule_actual: nil)}}
        end
    end

    def update
        # 返却登録
        equipment = Equipment.find_by(isbn: params[:isbn])

        # 備品の状態を更新
        unless equipment.update(status: 0)
            render json: { status: 'ERROR', data: equipment.errors }
        end
        
        lending_log = equipment.lending_logs.find_by(return_schedule_actual: nil)

        # 貸出記録を更新
        if lending_log.update(return_schedule_actual: Date.today)
            render json: { status: 'SUCCESS', data: lending_log }
        else
            render json: { status: 'ERROR', data: equipment.lending_log.errors }
        end
    end

    def extension
        # 貸出期間の延長登録
        lendingLog = LendingLog.find(params[:id])

        returnSchedule = getExtensionDay 14, lendingLog.return_schedule

        if lendingLog.update(return_schedule: returnSchedule)
            render json: { status: 'SUCCESS', data: lendingLog }
        else
            render json: { status: 'ERROR', data: lendingLog.errors }
        end
    end

    private
        def lendingLog_params
            params.permit(:user_id, :equipment_id, :loan_date, :return_schedule, :return_schedule_actual)
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
