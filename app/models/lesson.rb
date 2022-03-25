# frozen_string_literal: true

class Lesson < ApplicationRecord
  has_many :stages

  def first_stage
    Stage.find_by!(lesson_id: id, number: 1)
  end
end
