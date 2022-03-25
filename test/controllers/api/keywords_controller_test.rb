# frozen_string_literal: true

require 'test_helper'

class Api::KeywordsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @student = students(:profiled)
  end

  test 'should get index' do
    sign_in_as(@student)
    get api_keywords_path, as: :json

    assert_response :success
    json = JSON.parse(@response.body)
    assert_equal %w[content], json['keywords'].first.keys
  end

  test 'should not get index because the student does not sign in' do
    get api_keywords_path, as: :json

    assert_response :unauthorized
    json = JSON.parse(@response.body)
    assert_includes json['errors'], 'ログインされていません'
  end
end
