# frozen_string_literal: true

require 'test_helper'

class TeacherSignUpTest < ActionDispatch::IntegrationTest
  include ActionMailer::TestHelper

  test 'sign up success' do
    email = 'teacher@example.com'
    password = 'hoge1234'

    get '/sensei/sign_up'
    assert_response :success

    assert_emails 1 do
      post '/sensei/teachers',
           params: {
             teacher: {
               fullname: '先生1',
               email: email,
               password: password
             }
           }
    end

    assert_response :redirect
    follow_redirect!

    assert_response :success
    assert_equal '/sensei/unconfirm_email', path

    teacher = Teacher.find_by(email: email)
    get sensei_confirm_email_url(token: teacher.email_confirmation_token)

    get '/sensei/sign_in'
    assert_response :success
    assert_equal 'プログル技術のご利用登録が完了しました', flash[:success]

    post '/sensei/session',
         params: {
           session: {
             email: email,
             password: password
           }
         }

    assert_response :redirect
    follow_redirect!

    assert_response :success
    assert_equal '/sensei/class_rooms', path

    delete '/sensei/sign_out'
    assert_response :redirect
    follow_redirect!

    assert_response :success
    assert_equal '/sensei/sign_in', path
  end
end
