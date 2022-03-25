# frozen_string_literal: true

require 'test_helper'

class TermsControllerTest < ActionDispatch::IntegrationTest
  test 'should get terms#show with sign in' do
    sign_in_as(students(:profiled))
    get terms_url
    assert_response :success
    assert_select 'div', text: '利用規約です。'
  end

  test 'should not get terms#show without sign in' do
    get terms_url
    assert_redirected_to sign_in_url
  end
end
