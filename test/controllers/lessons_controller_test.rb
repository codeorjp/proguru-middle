# frozen_string_literal: true

require 'test_helper'

class LessonsControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    sign_in_as(students(:profiled))
    get lessons_url
    assert_response :success
  end

  test 'should not get index without sign in' do
    get lessons_url
    assert_redirected_to sign_in_url
  end
end
