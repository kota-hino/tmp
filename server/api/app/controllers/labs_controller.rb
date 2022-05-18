class LabsController < ApplicationController
    include ActionController::HttpAuthentication::Token::ControllerMethods
    before_action :authenticate

    def index
        data = Lab.all

        render json: { status: 'SUCCESS', data: data}
    end

    def create
        lab = Lab.new(name: params[:name])

        if lab.save
            render json: { status: 'SUCCESS', data: lab }
        else
            render json: { status: 'ERROR', data: lab.errors }
        end 
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
