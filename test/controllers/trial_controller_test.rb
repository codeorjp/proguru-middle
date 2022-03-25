# frozen_string_literal: true

require 'test_helper'

class TrialControllerTest < ActionDispatch::IntegrationTest
  test 'should get index' do
    get trial_index_url
    assert_response :success
  end

  test 'should get show' do
    get trial_url(1)
    assert_response :success
  end

  test 'should redirect index when not permitted param' do
    get trial_url(2)
    assert_redirected_to trial_index_url
  end
end
