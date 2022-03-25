# frozen_string_literal: true

require 'test_helper'

class LessonTest < ActiveSupport::TestCase
  setup do
    @lesson = Lesson.first
  end

  test '#first_stage belongs to caller lesson' do
    first_stage = @lesson.first_stage
    assert first_stage.lesson.id, @lesson.id
  end

  test '#first_stage stage number is always 1' do
    first_stage = @lesson.first_stage
    assert first_stage.number, 1
  end
end
