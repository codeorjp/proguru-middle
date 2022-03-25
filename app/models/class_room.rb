# frozen_string_literal: true

class ClassRoom < ApplicationRecord
  belongs_to :teacher
  has_many :students, dependent: :destroy
  has_many :message_boards, dependent: :destroy
  has_one :term, dependent: :destroy

  scope :owner, ->(teacher_id) { where(teacher_id: teacher_id) }

  validates :school_year, :name, presence: true
  # school_year will be sorted key, so it makes to strict format YYYY not but YY
  validates :school_year, numericality: { only_integer: true, greater_than: 2000 }
end
