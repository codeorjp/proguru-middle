# frozen_string_literal: true

require 'test_helper'

class StagesControllerTest < ActionDispatch::IntegrationTest
  test 'should show stage' do
    sign_in_as(students(:profiled))
    get lesson_stage_url(lesson_number: 1, number: 1)
    assert_response :success

    get lesson_stage_url(lesson_number: 2, number: 1)
    assert_response :success
  end

  test 'should redirect invalid param' do
    sign_in_as(students(:profiled))
    get lesson_stage_url(lesson_number: 0, number: 1)
    assert_response :missing

    get lesson_stage_url(lesson_number: 3, number: 0)
    assert_response :missing
  end

  test 'should go to student sign_in without sign in' do
    get lesson_stage_url(lesson_number: 3, number: 1)
    assert_redirected_to sign_in_url
  end
end
