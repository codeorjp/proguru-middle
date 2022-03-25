# frozen_string_literal: true

class Term < ApplicationRecord
  validates :content, presence: true
  validates :class_room_id, presence: true, uniqueness: true

  belongs_to :class_room
end
