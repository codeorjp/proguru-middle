# frozen_string_literal: true

get '/help' => 'help#index'
get '/sign_up' => 'sessions#sign_up'
get '/sign_in' => 'sessions#new'
delete '/sign_out' => 'sessions#destroy', as: '/sign_out'
post '/token_confirmation' => 'sessions#token_confirmation'

resources :passwords, only: [:new, :create]
resources :sessions, only: [:create]
resource :student, only: [:edit, :update]
resource :terms, only: [:show]

resources :lessons, only: [:index], param: :number do
  get :finish
  resources :stages, only: [:show], param: :number, module: 'lessons'
end

resources :chat_rooms, only: [:index]

resources :workspaces, only: [:create]

resources :keywords, only: [:index, :new, :create, :destroy]

namespace :api do
  resources :messages, only: [:create, :index]
  resource  :say_hello, only: [:create]
  resources :keywords, only: [:index]

  resources :lessons, only: [], param: :number do
    resources :stages, only: [], param: :number do
      resources :workspaces, only: [:index]
    end
  end
end
