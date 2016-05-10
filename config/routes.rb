Rails.application.routes.draw do
  get "/", to: "home#index"

  namespace :api, defaults: { format: :json } do
    namespace :v1 do
      resources :ideas, except: [:new, :edit]
    end
  end
end
