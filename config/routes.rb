Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      resources :posts
      devise_for :users, as: :api_v1, controllers: {
        registrations: 'api/v1/users/registrations',
        sessions: 'api/v1/users/sessions'
      }
      get 'member-data', to: 'members#show'
    end
  end
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
