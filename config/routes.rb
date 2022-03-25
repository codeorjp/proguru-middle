# frozen_string_literal: true

Rails.application.routes.draw do
  def draw(routes_name)
    instance_eval(Rails.root.join("config/routes/#{routes_name}.rb").read)
  end

  root 'home#index'

  draw(:sensei)
  draw(:student)

  resources :trial, only: [:index, :show]
end
