# frozen_string_literal: true

class Sensei::ChangePasswordForm
  include ActiveModel::Model

  attr_accessor :teacher, :current_password, :new_password, :new_password_confirmation

  validates :current_password, presence: true
  validate :authenticate_with_current_password

  validates :new_password,
            presence: true,
            length: { minimum: 8 },
            safe_password_format: true
  validates :new_password_confirmation, presence: true
  validates_confirmation_of :new_password

  private

    def authenticate_with_current_password
      return if teacher.authenticated?(current_password)

      errors.add(:current_password, :failed_password_authentication)
    end
end
