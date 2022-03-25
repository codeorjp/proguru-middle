# frozen_string_literal: true

require 'test_helper'

class Api::MessagesControllerTest < ActionDispatch::IntegrationTest
  FILE_NAME = 'enjoy-blockly.png'
  IMAGE_FILE = "files/#{FILE_NAME}"
  MESSAGE_BODY = 'message body'

  setup do
    @student = students(:profiled)
  end

  def icon_url(icon)
    "/images/#{icon}.png"
  end

  def assert_valid_message(message, student)
    assert_not_nil message['id']
    assert_equal student.nickname, message['nickname']
    assert_equal icon_url(student.icon), message['icon_url']
    assert_match(/^\d{10}$/, message['sent_at'].to_s)
  end

  def messages_json
    get api_messages_path, params: { kind: 'lessson' }, as: :json
    JSON.parse(@response.body)
    JSON.parse(@response.body)['messages']
  end

  test 'should create message by student' do
    sign_in_as(@student)
    assert_difference('Message.count') do
      post api_messages_url, params: { body: MESSAGE_BODY, kind: 'lesson' }
    end

    message = Message.last
    assert_response :created
    assert_equal @student, message.sender
  end

  test 'should create message with image by student' do
    sign_in_as(@student)
    image = fixture_file_upload(IMAGE_FILE)
    assert_difference('Message.count') do
      assert_difference('ActiveStorage::Blob.count') do
        post api_messages_url, params: { kind: 'lesson', image: image }
      end
    end

    message = Message.last
    assert_response :created
    assert_equal @student, message.sender
  end

  test 'should not create message without kind of message_board' do
    sign_in_as(@student)
    assert_no_difference('Message.count') do
      post api_messages_url, params: { body: 'message body', kind: nil }
    end

    json = JSON.parse(@response.body)
    assert_response :unprocessable_entity
    assert 1, json['errors'].size
    assert_includes json['errors'], 'チャットの種別を入力してください'
  end

  test 'should not create message without student login' do
    assert_no_difference('Message.count') do
      post api_messages_url, params: { body: MESSAGE_BODY, kind: 'lesson' }
    end

    json = JSON.parse(@response.body)
    assert_response :unauthorized
    assert 1, json['errors'].size
    assert_includes json['errors'], 'ログインされていません'
  end

  test 'should not create message when blank body & image' do
    sign_in_as(@student)
    assert_no_difference('Message.count') do
      post api_messages_url, params: { kind: 'lesson' }
    end

    json = JSON.parse(@response.body)
    assert_response :unprocessable_entity
    assert 2, json['errors'].size
    assert_includes json['errors'], 'メッセージ本文を入力してください'
    assert_includes json['errors'], '画像を入力してください'
  end

  test 'should not create message when body is too long string' do
    sign_in_as(@student)
    assert_no_difference('Message.count') do
      post api_messages_url, params: { body: 'あ' * 256, kind: 'lesson' }
    end

    json = JSON.parse(@response.body)
    assert_response :unprocessable_entity
    assert_includes json['errors'], 'メッセージ本文は255文字以内で入力してください'
  end

  test 'should fetch 20 latest messages without offset' do
    sign_in_as(@student)
    get api_messages_path, params: { kind: 'lesson' }, as: :json

    json = JSON.parse(@response.body)
    assert_response :success
    assert 20, json['messages'].size
    assert_equal %w[id sender_id sender_type nickname number icon_url body sent_at], json['messages'].first.keys

    sender_types = json['messages'].map { |message| message['sender_type'] }
    assert_includes sender_types, 'Student'
    assert_includes sender_types, 'Teacher'
  end

  test 'should fetch 1 new message with offset' do
    sign_in_as(@student)
    last_message = messages_json.last

    post api_messages_url, params: { body: MESSAGE_BODY, kind: 'lesson' }
    get api_messages_path, params: { last_id: last_message['id'], kind: 'lesson' }, as: :json

    json = JSON.parse(@response.body)
    message = json['messages'].first

    assert_response :success
    assert 1, json['messages'].size

    assert_valid_message(message, @student)
    assert_equal MESSAGE_BODY, message['body']
    assert_nil message['image_url']
    assert last_message['sent_at'] <= message['sent_at']
  end

  test 'should fetch 1 new image with offset' do
    sign_in_as(@student)
    image = fixture_file_upload(IMAGE_FILE)
    last_message = messages_json.last

    post api_messages_url, params: { kind: 'lesson', image: image }
    get api_messages_path, params: { last_id: last_message['id'], kind: 'lesson' }, as: :json

    json = JSON.parse(@response.body)
    message = json['messages'].first

    assert_response :success
    assert 1, json['messages'].size

    assert_valid_message(message, @student)
    assert_nil message['body']
    assert_match %r{/.+/#{FILE_NAME}$}, message['image_url']
    assert last_message['sent_at'] <= message['sent_at']
  end

  test 'should not fetch new message in other message_board' do
    sign_in_as(@student)
    last_message = messages_json.last

    post api_messages_url, params: { body: MESSAGE_BODY, kind: 'performance' }
    get api_messages_path, params: { last_id: last_message['id'], kind: 'lesson' }, as: :json

    json = JSON.parse(@response.body)
    assert 0, json['messages'].size
  end

  test 'should fetch 20 old message with offset' do
    sign_in_as(@student)

    post api_messages_url, params: { body: 'last', kind: 'lesson' }
    post api_messages_url, params: { body: 'first', kind: 'lesson' }
    first_message = Message.last

    get api_messages_path, params: { first_id: first_message['id'], kind: 'lesson' }, as: :json

    json = JSON.parse(@response.body)
    message = json['messages'].last

    assert_response :success
    assert 20, json['messages'].size

    assert_valid_message(message, @student)
    assert_equal 'last', message['body']
    assert_nil message['image_url']
    assert first_message.sent_at >= message['sent_at']
  end

  test 'should fetch 20 old image & message with offset' do
    sign_in_as(@student)
    image = fixture_file_upload(IMAGE_FILE)

    post api_messages_url, params: { image: image, kind: 'lesson' }
    post api_messages_url, params: { body: 'first', kind: 'lesson' }
    first_message = Message.last

    get api_messages_path, params: { first_id: first_message['id'], kind: 'lesson' }, as: :json

    json = JSON.parse(@response.body)
    message = json['messages'].last

    assert_response :success
    assert 20, json['messages'].size

    assert_valid_message(message, @student)
    assert_nil message['body']
    assert_match %r{/.+/#{FILE_NAME}$}, message['image_url']
    assert first_message.sent_at >= message['sent_at']
  end

  test 'should not fetch new message in other class_room message' do
    sign_in_as(@student)
    last_message = messages_json.last

    sign_in_as(students(:another))
    post api_messages_url, params: { body: MESSAGE_BODY, kind: 'lesson' }

    sign_in_as(@student)
    get api_messages_path, params: { last_id: last_message['id'], kind: 'lesson' }, as: :json

    json = JSON.parse(@response.body)
    assert 0, json['messages'].size
  end
end
