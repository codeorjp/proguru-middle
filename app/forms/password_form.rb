# frozen_string_literal: true

class PasswordForm
  include ActiveModel::Model

  attr_accessor :password, :password_confirmation

  validates :password,
            presence: true,
            length: { minimum: 8 },
            safe_password_format: true
  validates :password_confirmation, presence: true
  validates_confirmation_of :password
end
