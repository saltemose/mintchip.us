Rails.application.routes.draw do
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
namespace :api, defaults: {format: :json} do 
  resource :user, only: [:create]
  get '/users/:id/info', to: 'users#info'
  get '/users/:id/portfolio', to: 'users#portfolio'
  resources :news, only: [:index]
  resource :session, only: [:create, :destroy]
  resources :deposit, only: [:create, :destroy]
  resources :stocks, only: [:index]
    get '/stocks/:ticker', to: 'stocks#show'
  resources :transactions, except: [:new, :edit]
  

end

root "static_pages#root"
end