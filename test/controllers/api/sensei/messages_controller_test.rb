# frozen_string_literal: true

require 'test_helper'

class Api::Sensei::MessagesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @class_room = class_rooms(:one)
    @teacher = @class_room.teacher
  end

  test 'should get index for lesson messages' do
    sensei_sign_in_as(@teacher)
    get api_sensei_class_room_messages_path(@class_room), params: { kind: 'lesson' }, as: :json

    assert_response :success
    json = JSON.parse(@response.body)
    assert_equal %w[id nickname sender_number body sent_at], json['messages'].first.keys
  end

  test 'should get index for performance messages' do
    sensei_sign_in_as(@teacher)
    get api_sensei_class_room_messages_path(@class_room), params: { kind: 'performance' }, as: :json

    assert_response :success
    json = JSON.parse(@response.body)
    assert_equal %w[id nickname sender_number body sent_at], json['messages'].first.keys
  end

  test 'should get index with page params' do
    sensei_sign_in_as(@teacher)
    first_page = 1
    second_page = 2
    get api_sensei_class_room_messages_path(@class_room), params: { kind: 'lesson', page: first_page }, as: :json
    json_of_first_page = JSON.parse(@response.body)
    messages_count = json_of_first_page['messages_count']

    get api_sensei_class_room_messages_path(@class_room), params: { kind: 'lesson', page: second_page }, as: :json
    assert_response :success
    json_of_second_page = JSON.parse(@response.body)
    assert_equal messages_count, json_of_second_page['messages_count']
  end

  test "should not get index for other teacher's student's message" do
    other_class_room = class_rooms(:another)

    sensei_sign_in_as(@teacher)
    get api_sensei_class_room_messages_path(other_class_room), params: { kind: 'lesson' }, as: :json

    assert_response :not_found
    json = JSON.parse(@response.body)
    assert_equal '対象のクラスが見つかりませんでした', json['error']
  end

  test 'should not get index because teacher does not sign in' do
    get api_sensei_class_room_messages_path(@class_room), params: { kind: 'lesson' }, as: :json

    assert_response :unauthorized
    json = JSON.parse(@response.body)
    assert_includes json['errors'], 'ログインされていません'
  end

  test 'should destroy message' do
    sensei_sign_in_as(@teacher)
    lesson_board = @class_room.message_boards.lesson.last
    message = lesson_board.messages.first

    assert_difference('Message.count', -1) do
      delete api_sensei_class_room_message_path(class_room_id: @class_room.id, id: message.id)
    end

    assert_response :no_content
  end

  test "should not destroy other teacher's student's message" do
    other_class_student = students(:another)
    sensei_sign_in_as(@teacher)
    other_class_room = other_class_student.class_room
    messages = other_class_room.message_boards.lesson.last.messages
    message = messages.find_by(sender_id: other_class_student.id)

    assert_no_difference('Message.count') do
      delete api_sensei_class_room_message_path(class_room_id: other_class_room.id, id: message.id)
    end

    assert_response :not_found
    json = JSON.parse(@response.body)
    assert_equal '対象のクラスが見つかりませんでした', json['error']
  end

  test 'should not destroy message because teacher does not sign in' do
    lesson_board = @class_room.message_boards.lesson.last
    message = lesson_board.messages.first

    assert_no_difference('Message.count') do
      delete api_sensei_class_room_message_path(class_room_id: @class_room.id, id: message.id)
    end

    assert_response :unauthorized
    json = JSON.parse(@response.body)
    assert_includes json['errors'], 'ログインされていません'
  end

  test 'should destroy multiple messages' do
    sensei_sign_in_as(@teacher)
    lesson_board = @class_room.message_boards.lesson.last
    first_message_id = lesson_board.messages.first.id
    second_message_id = lesson_board.messages.second.id

    assert_difference('Message.count', -2) do
      delete delete_messages_api_sensei_class_room_messages_path(
        class_room_id: @class_room.id,
        message: {
          ids: [first_message_id, second_message_id]
        }
      )
    end

    assert_response :no_content
  end

  test "should not destroy other teacher's student's messages" do
    other_class_student = students(:another)
    sensei_sign_in_as(@teacher)
    other_class_room = other_class_student.class_room
    messages = other_class_room.message_boards.lesson.last.messages
    first_message_id = messages.where(sender_id: other_class_student.id).first.id
    second_message_id = messages.where(sender_id: other_class_student.id).second.id

    assert_no_difference('Message.count') do
      delete delete_messages_api_sensei_class_room_messages_path(
        class_room_id: other_class_room.id,
        message: {
          ids: [first_message_id, second_message_id]
        }
      )
    end

    assert_response :not_found
    json = JSON.parse(@response.body)
    assert_equal '対象のクラスが見つかりませんでした', json['error']
  end

  test 'should not destroy multiple messages because teacher does not sign in' do
    lesson_board = @class_room.message_boards.lesson.last
    first_message_id = lesson_board.messages.first.id
    second_message_id = lesson_board.messages.second.id

    assert_no_difference('Message.count') do
      delete delete_messages_api_sensei_class_room_messages_path(
        class_room_id: @class_room.id,
        message: {
          ids: [first_message_id, second_message_id]
        }
      )
    end

    assert_response :unauthorized
    json = JSON.parse(@response.body)
    assert_includes json['errors'], 'ログインされていません'
  end
end
