# frozen_string_literal: true

class StudentProfileForm
  include ActiveModel::Model

  attr_accessor :nickname, :icon, :student

  validates :nickname, presence: true
  validates :nickname, length: { in: 2..8 }
  validates :icon, presence: true
  validates :student, presence: true

  def to_model
    student.nickname = nickname
    student.icon = icon
    student
  end

  def save
    return false if invalid?

    to_model.set_profile!
  end
end
