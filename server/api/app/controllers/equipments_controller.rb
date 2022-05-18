class EquipmentsController < ApplicationController
    include ActionController::HttpAuthentication::Token::ControllerMethods
    before_action :authenticate

    require 'net/http'

    def index
        # 備品全件出力
        data = Equipment.all

        render json: { status: 'SUCCESS', data: data}
    end

    def show
        # 備品個別表示
        data = Equipment.find(params[:id])

        render json: { status: 'SUCCESS', data: data}
    end

    def searchItem
        # 備品検索

        if ! (params[:categoryName] == "none")

            category = Category.find_by(name: params[:categoryName])

            if category
                data = category.equipments
                render json: { status: 'SUCCESS', data: data}
            else
                render json: { status: 'SUCCESS', data: "no item"}
            end

        elsif ! (params[:equipmentName] == "none")

            data = Equipment.where("name LIKE ?", "%#{params[:equipmentName]}%")

            unless data == []
                render json: { status: 'SUCCESS', data: data }
            else
                render json: { status: 'SUCCESS', data: "no item"}
            end

        else
            render json: { status: 'ERROR', data: "Please enter your search information"}
        end
    end

    def create
        # 備品新規登録
        isbn = params[:isbn]

        # isbn番号がすでに同じものが存在するかどうか
        if Equipment.find_by(isbn: isbn)
            render json: { status: 'ERROR', data: "this number already exists"}
            return false
        end

        # openbd APIから検索
        param = URI.encode_www_form({isbn: isbn})
        uri = URI.parse("https://api.openbd.jp/v1/get?#{param}")
        response = Net::HTTP.get_response(uri)
        result = JSON.parse(response.body)

        unless result == [nil]
            # isbn番号から情報取得できた場合
            equipment = Equipment.new(
                name: result[0]["summary"]["title"],
                category_id: params[:category_id],
                image_path: result[0]["summary"]["cover"],
                status: Integer(params[:status]),
                isbn: isbn,
                detail: result[0]["onix"]["CollateralDetail"]["TextContent"][0]["Text"],
                lab_id: params[:lab_id]
            )
    
            if equipment.save
                render json: { status: 'SUCCESS', data: equipment }
            else
                render json: { status: 'ERROR', data: equipment.errors }
            end 
        else
            # isbn番号から情報取得できなかった場合
            if params[:name] && params[:category_id] && params[:isbn] && params[:lab_id] && params[:status]
                equipment = Equipment.new(equipment_params)

                if equipment.save
                    render json: { status: 'SUCCESS', data: equipment }
                else
                    render json: { status: 'ERROR', data: equipment.errors }
                end
            else
                render json: { status: 'SUCCESS', data: "Can't search with isbn" }
            end
        end
    end

    def update
        # 備品更新
        equipment = Equipment.find(params[:id])

        if equipment.update(equipment_params)
            render json: { status: 'SUCCESS', data: equipment }
        else
            render json: { status: 'ERROR', data: equipment.errors }
        end
    end

    private
        def equipment_params
            params.permit(:name, :category_id, :image_path, :status, :isbn, :detail, :lab_id)
        end

        def authenticate
            # 認証
            authenticate_or_request_with_http_token do |token, options|
                auth_user = User.find_by(token: token)
                auth_user != nil ? true : false
            end
        end
end
