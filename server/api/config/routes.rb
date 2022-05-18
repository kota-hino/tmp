Rails.application.routes.draw do
  # login
  post '/api/v1/login', to: 'login#login'
  
  # user
  get '/api/v1/user', to: 'users#index' # 開発中のみ使用可能
  post '/api/v1/user', to: 'users#create'

  # equipments
  # 備品を扱う
  get '/api/v1/equipment', to: 'equipments#index'
  get '/api/v1/equipment/searchitem', to: 'equipments#searchItem'
  get '/api/v1/equipment/:id', to: 'equipments#show'
  post '/api/v1/equipment', to: 'equipments#create'
  put '/api/v1/equipment/:id', to: 'equipments#update'

  # lab
  get '/api/v1/lab', to: 'labs#index'
  post '/api/v1/lab', to: 'labs#create'

  # category
  get '/api/v1/category', to: 'categorys#index'
  post '/api/v1/category', to: 'categorys#create'

  # lending_logs
  # 書籍の貸し出し記録を扱う
  get '/api/v1/lendinglog', to: 'lending_logs#index'
  get '/api/v1/lendinglog/lentitem', to: 'lending_logs#getLentItem'
  get '/api/v1/lendinglog/:userId', to: 'lending_logs#getLentItemAsUser'
  post '/api/v1/lendinglog', to: 'lending_logs#create'
  put '/api/v1/lendinglog/:isbn', to: 'lending_logs#update'
  put '/api/v1/lendinglog/extension/:id', to: 'lending_logs#extension'

  # lending_log_photos
  # 書籍以外の貸し出し記録を扱う
  get '/api/v1/lendinglogphoto', to: 'lending_log_photos#index'
  get '/api/v1/lendinglogphoto/:id', to: 'lending_log_photos#show'
  get '/api/v1/lendinglogphoto/lentitem/:userId', to: 'lending_log_photos#getLentItemAsUser'
  post '/api/v1/lendinglogphoto', to: 'lending_log_photos#create'
  post '/api/v1/lendinglogphoto/:id', to: 'lending_log_photos#update'
  put '/api/v1/lendinglogphoto/extension/:id', to: 'lending_log_photos#extension'

  # log
  # 書籍、書籍以外、全体の貸し出し記録の操作をする
  get '/api/v1/log', to: 'log#index'
  get '/api/v1/log/lentitem', to: 'log#getLentItem'
  get '/api/v1/log/:userId', to: 'log#getLentItemAsUser'
end
