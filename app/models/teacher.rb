# frozen_string_literal: true

class Teacher < ApplicationRecord
  include Clearance::User

  has_many :class_rooms, dependent: :destroy
  has_one_attached :icon

  validates :fullname, presence: true
  validates :unconfirmed_email,
            email: true,
            allow_nil: true
  validates :password,
            length: { minimum: 8 },
            safe_password_format: true,
            unless: :skip_password_validation?
  validates :email_delivery_allowed, inclusion: { in: [true, false] }

  def initialize(*args)
    super
    self.email_confirmation_token = Clearance::Token.new
  end

  def confirm_email
    if unconfirmed_email
      self.email = unconfirmed_email
      self.unconfirmed_email = nil
    end
    self.email_confirmed_at = Time.current
    save
  end
end
