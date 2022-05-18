class CategorysController < ApplicationController
    include ActionController::HttpAuthentication::Token::ControllerMethods
    before_action :authenticate
    
    def index
        data = Category.all

        render json: { status: 'SUCCESS', data: data}
    end

    def create
        category = Category.new(name: params[:name])

        if category.save
            render json: { status: 'SUCCESS', data: category }
        else
            render json: { status: 'ERROR', data: category.errors }
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
