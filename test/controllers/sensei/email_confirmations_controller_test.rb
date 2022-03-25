# frozen_string_literal: true

require 'test_helper'

class Sensei::EmailConfirmationsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @teacher = Teacher.create(
      fullname: '先生1',
      email: 'hoge@example.com',
      password: 'passw0rd',
      email_confirmed_at: nil
    )
    @token = @teacher.email_confirmation_token
  end

  test 'should get update' do
    get sensei_confirm_email_path(token: @token)
    assert_response :redirect

    follow_redirect!
    assert_equal '/sensei/sign_in', path

    @teacher.reload
    assert @teacher.email_confirmed_at.present?
  end

  test 'should be blocked sign in before email confirmation' do
    post '/sensei/session',
         params: {
           session: {
             email: @teacher.email,
             password: @teacher.password
           }
         }
    assert_response :bad_request
    assert_equal '/sensei/session', path
    assert_equal '利用登録確認メールより，登録手続きを完了させてください。', flash[:error]
  end

  test 'sign in after email confirmation' do
    get sensei_confirm_email_path(token: @token)
    post '/sensei/session',
         params: {
           session: {
             email: @teacher.email,
             password: @teacher.password
           }
         }
    assert_response :redirect

    follow_redirect!
    assert_equal '/sensei/class_rooms', path
  end
end
