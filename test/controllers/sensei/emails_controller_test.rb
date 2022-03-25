# frozen_string_literal: true

require 'test_helper'

class Sensei::EmailsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @teacher = teachers(:confirmed)
    sensei_sign_in_as(@teacher)
  end

  test 'should get edit' do
    get edit_sensei_teacher_email_path(@teacher)
    assert_response :success
  end

  test 'should update email' do
    email = 'change_email@example.com'
    patch sensei_teacher_email_path(@teacher),
          params: {
            teacher: {
              email: email
            }
          }
    assert_response :redirect

    token = Teacher.find_by(email: @teacher.email).email_confirmation_token
    assert_not_empty token

    mail = ActionMailer::Base.deliveries.last
    assert_not_nil mail
    assert_equal email, mail['to'].to_s
    assert_equal 'メールアドレスの変更手続きを完了させてください', mail['subject'].to_s

    [mail.html_part, mail.text_part].each do |part|
      assert part.body.include?(token)
    end
  end

  test 'should not update email because email is blank' do
    email = ''
    assert_emails 0 do
      patch sensei_teacher_email_path(@teacher),
            params: {
              teacher: {
                email: email
              }
            }
    end
    assert_select_error_explanation('メールアドレスは不正な値です')
  end

  test 'should not update email because email is informal' do
    email = 'abcde'
    assert_emails 0 do
      patch sensei_teacher_email_path(@teacher),
            params: {
              teacher: {
                email: email
              }
            }
    end
    assert_select_error_explanation('メールアドレスは不正な値です')
  end

  test 'should not update email because email is same' do
    email = @teacher.email
    assert_emails 0 do
      patch sensei_teacher_email_path(@teacher),
            params: {
              teacher: {
                email: email
              }
            }
    end
    assert_equal '入力されたメールアドレスは既に使用されています', flash[:error]
  end
end
