# frozen_string_literal: true

require 'test_helper'

class TeacherEmailChangeTest < ActionDispatch::IntegrationTest
  include ActionMailer::TestHelper

  test 'email change success' do
    teacher = teachers(:confirmed)
    sensei_sign_in_as(teacher)

    email = 'change_email@example.com'
    assert_emails 1 do
      patch sensei_teacher_email_path(teacher),
            params: {
              teacher: {
                email: email
              }
            }
    end

    assert_response :redirect
    follow_redirect!

    assert_response :success
    assert_equal '/sensei/unconfirm_email', path

    token = teacher.reload.email_confirmation_token
    get sensei_confirm_email_url(token: token)
    assert_redirected_to sensei_class_rooms_url

    assert_equal 'メールアドレスが変更されました', flash[:success]
    assert_equal 'change_email@example.com', teacher.reload.email
  end
end
