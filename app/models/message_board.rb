# frozen_string_literal: true

class MessageBoard < ApplicationRecord
  belongs_to :class_room
  has_many :messages, dependent: :destroy

  enum kind: { lesson: 0, performance: 1 }

  scope :performance, -> { where(kind: :performance) }
end
