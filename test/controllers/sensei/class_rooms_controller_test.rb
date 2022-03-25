# frozen_string_literal: true

require 'test_helper'

class Sensei::ClassRoomsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @class_room = class_rooms(:one)
    @teacher = @class_room.teacher
    @other_class_room = class_rooms(:another)
  end

  test 'should get index that has only own classes' do
    sensei_sign_in_as(@teacher)
    get sensei_class_rooms_url
    assert_response :success
    assert_select 'p', text: /#{@class_room.name}/, count: 1
    assert_select 'p', text: /#{@other_class_room.name}/, count: 0
    assert_not_equal @teacher, @other_class_room.teacher
  end

  test 'should get new' do
    sensei_sign_in_as(@teacher)
    get new_sensei_class_room_url
    assert_response :success
  end

  test 'should create class_room and students' do
    sensei_sign_in_as(@teacher)
    students_count = 1
    assert_difference(['ClassRoom.count', 'Student.count']) do
      post sensei_class_rooms_url, params: { class_room_form: { name: @class_room.name, school_year: @class_room.school_year, students_count: students_count } }
    end

    message_boards = ClassRoom.last.message_boards
    assert_redirected_to sensei_class_rooms_url
    assert_equal 2, message_boards.count
    assert_equal %w[lesson performance], message_boards.map(&:kind)
    assert_equal students_count, ClassRoom.last.students.count
  end

  test 'should not create because parameters are empty' do
    sensei_sign_in_as(@teacher)
    empty_name = ''
    empty_school_year = ''
    empty_students_count = ''
    assert_no_difference(['ClassRoom.count', 'Student.count']) do
      post sensei_class_rooms_url, params: { class_room_form: { name: empty_name, school_year: empty_school_year, students_count: empty_students_count } }
    end
    assert_select_error_explanation('年度を入力してください')
    assert_select_error_explanation('年度は数値で入力してください')
    assert_select_error_explanation('クラス名を入力してください')
    assert_select_error_explanation('クラス人数は数値で入力してください')
    assert_equal sensei_class_rooms_path, path
  end

  test 'should get edit' do
    sensei_sign_in_as(@teacher)
    get edit_sensei_class_room_url(@class_room)
    assert_response :success
  end

  test "should not edit other teacher's class rooms" do
    sensei_sign_in_as(@teacher)
    get edit_sensei_class_room_url(@other_class_room)
    assert_redirected_to sensei_class_rooms_path
    assert_equal '対象のクラスが見つかりませんでした', flash[:error]
  end

  test 'should update class_room' do
    sensei_sign_in_as(@teacher)
    patch sensei_class_room_url(@class_room), params: { class_room: { name: @class_room.name, school_year: @class_room.school_year } }
    assert_redirected_to sensei_class_rooms_url
  end

  test "should not update other teacher's class rooms" do
    sensei_sign_in_as(@teacher)
    patch sensei_class_room_url(@other_class_room), params: { class_room: { name: @class_room.name, school_year: @class_room.school_year } }
    assert_redirected_to sensei_class_rooms_path
    assert_equal '対象のクラスが見つかりませんでした', flash[:error]
  end

  test 'should not update class rooms because parameters are empty' do
    sensei_sign_in_as(@teacher)
    empty_name = ''
    empty_school_year = ''
    assert_no_changes -> { [@class_room.reload.name, @class_room.reload.school_year] } do
      patch sensei_class_room_url(@class_room), params: { class_room: { name: empty_name, school_year: empty_school_year } }
    end
    assert_select_error_explanation('年度を入力してください')
    assert_select_error_explanation('年度は数値で入力してください')
    assert_select_error_explanation('クラス名を入力してください')
    assert_equal sensei_class_room_path, path
  end

  test 'should destroy class_room' do
    sensei_sign_in_as(@teacher)
    assert_difference('ClassRoom.count', -1) do
      delete sensei_class_room_url(@class_room)
    end

    assert_redirected_to sensei_class_rooms_url
  end

  test "should not destroy other teacher's class rooms" do
    sensei_sign_in_as(@teacher)
    assert_no_difference('ClassRoom.count') do
      delete sensei_class_room_url(@other_class_room)
    end

    assert_redirected_to sensei_class_rooms_path
    assert_equal '対象のクラスが見つかりませんでした', flash[:error]
  end

  test 'should redirect before sign-in' do
    get sensei_class_rooms_url
    assert_redirected_to sensei_sign_in_path

    get new_sensei_class_room_url
    assert_redirected_to sensei_sign_in_path

    post sensei_class_rooms_url, params: { class_room: { name: @class_room.name, school_year: @class_room.school_year } }
    assert_redirected_to sensei_sign_in_path

    get edit_sensei_class_room_url(@class_room)
    assert_redirected_to sensei_sign_in_path

    patch sensei_class_room_url(@class_room), params: { class_room: { name: @class_room.name, school_year: @class_room.school_year } }
    assert_redirected_to sensei_sign_in_path

    delete sensei_class_room_url(@class_room)
    assert_redirected_to sensei_sign_in_path
  end
end
