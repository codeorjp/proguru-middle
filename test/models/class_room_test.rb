# frozen_string_literal: true

require 'test_helper'

class ClassRoomTest < ActiveSupport::TestCase
  setup do
    @teacher = teachers(:confirmed)
  end
  test 'valid class_room' do
    class_room = ClassRoom.new(school_year: 2019, name: '1年B組', teacher: @teacher)
    assert class_room.valid?
  end
  test 'invalid class_room without school_year' do
    class_room = ClassRoom.new(name: '1年B組', teacher: @teacher)
    assert_not class_room.valid?
    assert_not_nil class_room.errors[:school_year]
  end

  test 'invalid class_room that school_year should be greater than 2000' do
    class_room = ClassRoom.new(name: '1年B組', school_year: 1999, teacher: @teacher)
    assert_not class_room.valid?
    assert_not_nil class_room.errors[:school_year]
  end

  test 'invalid class_room without name' do
    class_room = ClassRoom.new(school_year: 2019, teacher: @teacher)
    assert_not class_room.valid?
    assert_not_nil class_room.errors[:name]
  end

  test 'invalid class_room without teacher' do
    class_room = ClassRoom.new(school_year: 2019, name: '1年B組')
    assert_not class_room.valid?
    assert_not_nil class_room.errors[:teacher]
  end
end
