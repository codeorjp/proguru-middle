# frozen_string_literal: true

require 'test_helper'

class Sensei::StudentPrintsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @teacher = teachers(:confirmed)
    @class_room = ClassRoom.owner(@teacher.id).first
  end

  test 'should get index' do
    sensei_sign_in_as(@teacher)
    get sensei_class_room_student_prints_url(@class_room.id)
    assert_response :success
  end

  test "should not get index athor teacher's class_room" do
    sensei_sign_in_as(@teacher)
    get sensei_class_room_student_prints_url(class_rooms(:another).id)
    assert_redirected_to sensei_class_rooms_path
    assert_equal '対象のクラスが見つかりませんでした', flash[:error]
  end

  test 'should not get index without sign in' do
    get sensei_class_room_student_prints_url(@class_room.id)
    assert_redirected_to sensei_sign_in_url
  end
end
