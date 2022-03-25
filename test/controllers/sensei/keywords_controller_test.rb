# frozen_string_literal: true

require 'test_helper'

class Sensei::KeywordsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @student = students(:profiled)
    @teacher = @student.class_room.teacher
  end

  test 'should get index' do
    sensei_sign_in_as(@teacher)
    get sensei_student_keywords_path(@student)
    assert_response :success
  end

  test "should redirect another teacher's student's keywords" do
    sensei_sign_in_as(@teacher)
    other_class_room = ClassRoom.find_by(teacher: teachers(:another))
    student = other_class_room.students.first

    get sensei_student_keywords_path(student)
    assert_redirected_to sensei_class_rooms_url
    assert_equal flash[:error], '対象の生徒が見つかりませんでした'
  end

  test 'should redirect teacher without sign in' do
    get sensei_student_keywords_path(@student)
    assert_redirected_to sensei_sign_in_url
  end
end
