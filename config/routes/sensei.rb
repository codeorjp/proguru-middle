# frozen_string_literal: true

namespace 'sensei' do
  resources :teachers, only: [:create, :edit, :update, :destroy] do
    resource :password, only: [:edit, :update], controller: 'passwords'
    resource :email, only: [:edit, :update], controller: 'emails'
  end
  resources :class_rooms, only: [:index, :new, :create, :update, :edit, :destroy] do
    resources :students, shallow: true, only: [:index, :new, :create, :update, :edit, :destroy] do
      post '/reset' => 'students#reset'
      post '/unlock' => 'students#unlock'
      resources :workspaces, only: [:index, :show]
      resources :keywords, only: [:index]
    end
    resources :student_prints, only: [:index]
    resource :terms, only: [:new, :create, :show, :edit, :update]
    resources :stages, only: [:index, :show]
  end

  resources :message_boards, only: [:show]
  resources :passwords, only: [:create, :new]
  resource :change_password, only: [:edit, :update]
  resource :session, only: [:create]

  get '/sign_up' => 'teachers#new', as: 'sign_up'
  get '/sign_in' => 'sessions#new', as: 'sign_in'
  delete '/sign_out' => 'sessions#destroy', as: 'sign_out'

  get '/confirm_email/:token' => 'email_confirmations#update', as: 'confirm_email'
  get '/unconfirm_email' => 'email_confirmations#show'
end

namespace :api do
  namespace :sensei do
    resources :class_rooms, only: [] do
      resources :messages, only: [:index, :destroy] do
        delete :delete_messages, on: :collection
      end
    end
  end
end
