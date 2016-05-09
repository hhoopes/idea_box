Rails.application.routes.draw do
  get "/", to: "home#index"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      get "/ideas", to: "ideas#index"
    end
  end
end
