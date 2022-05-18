class LogController < ApplicationController
    include ActionController::HttpAuthentication::Token::ControllerMethods
    before_action :authenticate

    def index
        lendingLogs = LendingLog.all
        lendingLogPhotos = LendingLogPhoto.all
        lendingLogPhotos = lendingLogPhotos.as_json(methods: :image_url)

        render json: { status: 'SUCCESS', data: { lendingLog: lendingLogs, lendingLogPhotos: lendingLogPhotos } }
    end

    def getLentItem
        # 貸出中の備品を取得
        lendingLogs = LendingLog.where(return_schedule_actual: nil)
        lendingLogPhotos = LendingLogPhoto.where(return_schedule_actual: nil)
        lendingLogPhotos = lendingLogPhotos.as_json(methods: :image_url)

        data = lendingLogs + lendingLogPhotos

        render json: { status: 'SUCCESS', data: data }
    end

    def getLentItemAsUser
        # ユーザーごとの貸し出し中備品を取得
        lendingLogs = LendingLog.where(user_id: params[:userId], return_schedule_actual: nil)

        lendingLogsData = [];
        equipmentData = [];
        lendingLogs.each_with_index do |lendingLog, index|
            lendingLogsData.push(lendingLog)
            equipmentData.push(lendingLog.equipment)
        end

        lendingLogPhotos = LendingLogPhoto.where(user_id: params[:userId], return_schedule_actual: nil)
        lendingLogPhotos = lendingLogPhotos.as_json(methods: :image_url)

        render json: { status: 'SUCCESS', data: { lendingLog: lendingLogsData, equipment: equipmentData, lendingLogPhotos: lendingLogPhotos } }
    end

    private
        def authenticate
            # 認証
            authenticate_or_request_with_http_token do |token, options|
                auth_user = User.find_by(token: token)
                auth_user != nil ? true : false
            end
        end
end
