# frozen_string_literal: true

class Keyword < ApplicationRecord
  belongs_to :student

  scope :owner, ->(student) { where(student: student) }

  validates :content, presence: true, uniqueness: { scope: :student }
  validate :check_count_of_keywords

  MAX_KEYWORDS_COUNT = 10

  def check_count_of_keywords
    return if student && student.keywords.count < MAX_KEYWORDS_COUNT

    errors.add(:content, :failed_keyword_creation_maximum_count_exceeded)
  end
end
