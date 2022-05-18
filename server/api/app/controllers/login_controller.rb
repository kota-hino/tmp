class LoginController < ApplicationController
  def login
    # ログイン処理
    login_user = User.select(:id, :name, :token).find_by(name: params[:name], pwd: params[:pwd])

    if login_user != nil
      render json: { status: 'SUCCESS', data: login_user }
    else
      render json: { status: 'ERROR', data: 'no auth' }
    end
  end
end
