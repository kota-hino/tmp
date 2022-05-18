class UsersController < ApplicationController
    include ActionController::HttpAuthentication::Token::ControllerMethods
    before_action :authenticate, only: [:index]

    def index
        data = User.select(:id, :name).all

        render json: { status: 'SUCCESS', data: data}
    end

    def create
        # ユーザー作成
        user = User.new(user_params)

        if user.save
            render json: { status: 'SUCCESS', data: user }
        else
            render json: { status: 'ERROR', data: user.errors }
        end 
    end

    private
        def user_params
            params.permit(:name, :auth_nfc, :pwd)
        end

        def authenticate
            # 認証
            authenticate_or_request_with_http_token do |token, options|
                auth_user = User.find_by(token: token)
                auth_user != nil ? true : false
            end
        end
end