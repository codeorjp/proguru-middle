# frozen_string_literal: true

require 'test_helper'

class Sensei::StudentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @student = students(:profiled)
    @class_room = @student.class_room
    @teacher = @class_room.teacher
  end

  test 'should get index that has only a class_room members' do
    sensei_sign_in_as(@teacher)
    get sensei_class_room_students_url(@class_room)
    assert_response :success
    assert_select 'th', text: /^出席番号/, count: 1
    assert_select 'td', text: /^#{@student.number}$/, count: 1
  end

  test 'shoud not get index the class by other teacher' do
    other_class = class_rooms(:another)
    sensei_sign_in_as(@teacher)
    get sensei_class_room_students_url(other_class.id)

    assert_redirected_to sensei_class_rooms_path
    assert_equal '対象のクラスが見つかりませんでした', flash[:error]
  end

  test 'should get new' do
    sensei_sign_in_as(@teacher)
    get new_sensei_class_room_student_url(@class_room)
    assert_response :success
  end

  test 'should create student' do
    sensei_sign_in_as(@teacher)
    assert_difference('Student.count') do
      post sensei_class_room_students_url(@class_room), params: { student: { number: Student.maximum(:number) + 1 } }
    end

    assert_redirected_to sensei_class_room_students_url(@class_room)
  end

  test "should not create student other teacher's class" do
    other_class = class_rooms(:another)
    sensei_sign_in_as(@teacher)
    assert_no_difference('Student.count') do
      post sensei_class_room_students_url(other_class.id), params: { student: { number: Student.maximum(:number) + 1 } }
    end

    assert_redirected_to sensei_class_rooms_path
    assert_equal '対象のクラスが見つかりませんでした', flash[:error]
  end

  test 'should get edit' do
    sensei_sign_in_as(@teacher)
    get edit_sensei_student_url(@student)
    assert_response :success
  end

  test "should not edit other teacher's student" do
    other_class_student = students(:another)
    sensei_sign_in_as(@teacher)
    get edit_sensei_student_url(other_class_student)

    assert_redirected_to sensei_class_rooms_url
    assert_equal '対象の生徒が見つかりませんでした', flash[:error]
  end

  test 'should update student' do
    sensei_sign_in_as(@teacher)
    patch sensei_student_url(@student), params: { student: { class_room_id: @class_room.id, number: @student.number } }

    assert_redirected_to sensei_class_room_students_url(@class_room)
  end

  test "should not update other teacher's student" do
    other_class_student = students(:another)
    sensei_sign_in_as(@teacher)
    patch sensei_student_url(other_class_student), params: { student: { class_room_id: @class_room.id, number: @student.number } }

    assert_redirected_to sensei_class_rooms_path
    assert_equal '対象の生徒が見つかりませんでした', flash[:error]
  end

  test 'should destroy student' do
    sensei_sign_in_as(@teacher)
    assert_difference('Student.count', -1) do
      delete sensei_student_url(@student)
    end

    assert_redirected_to sensei_class_room_students_url(@class_room)
  end

  test "should not destroy other teacher's student" do
    other_class_student = students(:another)
    sensei_sign_in_as(@teacher)
    assert_no_difference('Student.count') do
      delete sensei_student_url(other_class_student)
    end

    assert_redirected_to sensei_class_rooms_path
    assert_equal '対象の生徒が見つかりませんでした', flash[:error]
  end

  test 'should student status reset' do
    sensei_sign_in_as(@teacher)
    post sensei_student_reset_path(@student.id)

    assert_not @student.reload.profiled?
    assert_redirected_to sensei_class_room_students_url(@class_room)
    assert_equal '対象の生徒を初期化しました', flash[:notice]
  end

  test 'should not student status reset' do
    student = students(:passworded_other_class)
    sensei_sign_in_as(@teacher)
    post sensei_student_reset_path(student.id)

    assert student.reload.passworded?
    assert_equal '対象の生徒が見つかりませんでした', flash[:error]
  end

  test 'should student status unlock' do
    student = students(:account_locked)
    class_room = student.class_room
    teacher = class_room.teacher
    sensei_sign_in_as(teacher)
    post sensei_student_unlock_path(student.id)

    assert student.reload.profiled?
    assert_redirected_to sensei_class_room_students_url(class_room)
    assert_equal '対象の生徒のロックを解除しました', flash[:notice]
  end

  test 'should not student status unlock' do
    student = students(:account_locked_other_class)
    sensei_sign_in_as(@teacher)
    post sensei_student_unlock_path(student.id)

    assert student.reload.account_locked?
    assert_equal '対象の生徒が見つかりませんでした', flash[:error]
  end

  test 'should redirect before sign-in' do
    get sensei_class_room_students_url(@class_room)
    assert_redirected_to sensei_sign_in_path

    get new_sensei_class_room_student_url(@class_room)
    assert_redirected_to sensei_sign_in_path

    post sensei_class_room_students_url(@class_room), params: { student: { class_room_id: @class_room.id, password: 'password', number: Student.maximum(:number) + 1 } }
    assert_redirected_to sensei_sign_in_path

    get edit_sensei_student_url(@student)
    assert_redirected_to sensei_sign_in_path

    patch sensei_student_url(@student), params: { student: { class_room_id: @class_room.id, number: @student.number } }
    assert_redirected_to sensei_sign_in_path

    delete sensei_student_url(@student)
    assert_redirected_to sensei_sign_in_path
  end
end
