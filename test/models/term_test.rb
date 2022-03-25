# frozen_string_literal: true

require 'test_helper'

class TermTest < ActiveSupport::TestCase
  setup do
    @class_room = class_rooms(:another)
  end

  test 'valid term' do
    term = Term.new(content: 'ここには利用規約が入力されます', class_room_id: @class_room.id)
    assert term.valid?
  end

  test 'invalid term without class_room' do
    term = Term.new(content: 'ここには利用規約が入力されます')
    assert_not term.valid?
    assert_not_nil term.errors[:class_room]
  end

  test 'invalid term which has no content' do
    term = Term.new(content: '', class_room_id: @class_room.id)
    assert_not term.valid?
    assert_not_nil term.errors[:class_room]
  end
end
