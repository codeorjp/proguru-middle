# frozen_string_literal: true

require 'test_helper'

class Sensei::SessionsControllerTest < ActionDispatch::IntegrationTest
  test 'should get sign_in' do
    get sensei_sign_in_path
    assert_response :success
  end

  test 'should create sucess' do
    teacher = teachers(:confirmed)
    post sensei_session_path,
         params: {
           session: {
             email: teacher.email,
             password: 'passw0rd'
           }
         }

    assert_redirected_to sensei_class_rooms_path

    follow_redirect!
    assert_select 'p', text: 'クラス一覧'
  end

  test 'should show error when create failed' do
    post sensei_session_path,
         params: {
           session: {
             email: '',
             password: ''
           }
         }

    assert_response :bad_request
    error = '正しいメールアドレス，パスワードを入力してください。'
    assert_equal error, flash[:error]
  end
end
