# frozen_string_literal: true

require 'test_helper'

class ChatRoomsControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    sign_in_as(students(:profiled))
    get chat_rooms_url
    assert_response :success
  end

  test 'should not get index without sign in' do
    get chat_rooms_url
    assert_redirected_to sign_in_url
  end
end
