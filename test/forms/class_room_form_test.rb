# frozen_string_literal: true

require 'test_helper'

class ClassRoomFormTest < ActiveSupport::TestCase
  setup do
    @teacher = teachers(:confirmed)
    @school_year = 2020
    @name = 'さわやか3組'
  end

  def params
    { school_year: @school_year, name: @name, teacher_id: @teacher.id }
  end

  test 'should be valid' do
    form = ClassRoomForm.new(params.merge(students_count: 1))
    assert form.valid?
  end

  test 'should be valid by students_count <= 50' do
    form = ClassRoomForm.new(params.merge(students_count: 50))
    assert form.valid?
  end

  test 'should be in valid by students_count is 0' do
    form = ClassRoomForm.new(params.merge(students_count: 0))
    assert_not form.valid?
  end

  test 'should be in valid by students_count > 50' do
    form = ClassRoomForm.new(params.merge(students_count: 51))
    assert_not form.valid?
  end

  test 'should save a ClassRoom & two MessageBoard & Students' do
    form = ClassRoomForm.new(params.merge(students_count: 1))
    assert_difference('ClassRoom.count', 1) do
      assert_difference('MessageBoard.count', 2) do
        assert_difference('Student.count', 1) do
          assert form.save
        end
      end
    end
  end

  test 'shoud not save when ClassRoomForm is invalid' do
    form = ClassRoomForm.new(params.merge(students_count: 0))
    assert_no_difference('ClassRoom.count') do
      assert_no_difference('MessageBoard.count') do
        assert_no_difference('Student.count') do
          assert_not form.save
        end
      end
    end
  end
end
