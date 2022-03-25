# frozen_string_literal: true

require 'test_helper'

class Api::SayHellosControllerTest < ActionDispatch::IntegrationTest
  test 'should create message by student' do
    student = students(:profiled)
    sign_in_as(student)
    assert_difference('Message.count', 1) do
      post api_say_hello_url, params: { body: 'おはよう', hour: 11 }
    end

    message = Message.last
    assert_response :created
    assert_equal 'おはよう！', JSON.parse(@response.body)['reply']
    assert_equal student, message.sender
  end

  test 'should not create message by student because body is empty string' do
    student = students(:profiled)
    sign_in_as(student)
    assert_no_difference('Message.count') do
      post api_say_hello_url, params: { body: '', hour: 11 }
    end

    assert_response :unprocessable_entity
    json = JSON.parse(@response.body)
    assert_includes json['errors'], 'メッセージ本文を入力してください'
    assert_includes json['errors'], '画像を入力してください'
  end

  test 'should not create message by student because body is too long string' do
    student = students(:profiled)
    sign_in_as(student)
    assert_no_difference('Message.count') do
      post api_say_hello_url, params: { body: 'あ' * 256, hour: 11 }
    end

    assert_response :unprocessable_entity
    json = JSON.parse(@response.body)
    assert_includes json['errors'], 'メッセージ本文は255文字以内で入力してください'
  end

  test 'should not create message without student login' do
    assert_no_difference('Message.count') do
      post api_say_hello_url, params: { body: 'おはよう', hour: 11 }
    end

    json = JSON.parse(@response.body)
    assert_response :unauthorized
    assert 1, json['errors'].size
    assert_includes json['errors'], 'ログインされていません'
  end
end
