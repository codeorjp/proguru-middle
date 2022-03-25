# frozen_string_literal: true

require 'test_helper'

class Sensei::StagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @class_room = class_rooms(:one)
    @teacher = @class_room.teacher
    @stage = Stage.first
  end

  test 'should get index' do
    sensei_sign_in_as(@teacher)
    get sensei_class_room_stages_path(class_room_id: @class_room.id)

    assert_response :success
  end

  test 'should not get index that has only a class_room members' do
    sensei_sign_in_as(@teacher)
    other_class = class_rooms(:another)
    get sensei_class_room_stages_path(class_room_id: other_class.id)

    assert_redirected_to sensei_class_rooms_path
    assert_equal '対象のクラスが見つかりませんでした', flash[:error]
  end

  test 'should get show' do
    sensei_sign_in_as(@teacher)
    get sensei_class_room_stages_path(class_room_id: @class_room.id, id: @stage.id)

    assert_response :success
  end

  test 'should not get show other teachers class_room' do
    sensei_sign_in_as(@teacher)
    other_class = class_rooms(:another)
    get sensei_class_room_stages_path(class_room_id: other_class.id, id: @stage.id)

    assert_redirected_to sensei_class_rooms_path
    assert_equal '対象のクラスが見つかりませんでした', flash[:error]
  end

  test 'should redirect before sign-in' do
    get sensei_class_room_stages_path(class_room_id: @class_room.id)
    assert_redirected_to sensei_sign_in_path

    get sensei_class_room_stages_path(class_room_id: @class_room.id, id: @stage.id)
    assert_redirected_to sensei_sign_in_path
  end
end
