# frozen_string_literal: true

require 'guards/confirmed_user_guard'

Clearance.configure do |config|
  config.mailer_sender = 'proguru-middle@code.or.jp'
  config.rotate_csrf_on_sign_in = true
  config.routes = false
  config.user_model = 'Teacher'
  config.cookie_name = 'teacher_remember_token'
  config.sign_in_guards = [ConfirmedUserGuard]
  config.redirect_url = '/sensei/class_rooms'
end
