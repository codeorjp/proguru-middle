# frozen_string_literal: true

require 'test_helper'

class Sensei::PasswordsControllerTest < ActionDispatch::IntegrationTest
  def forgot_password_teacher
    teacher = teachers(:confirmed)
    teacher.forgot_password!
    teacher
  end

  test 'should get new' do
    get new_sensei_password_path
    assert_response :success
  end

  test 'should post reset password & sent reset mail' do
    teacher = teachers(:confirmed)
    assert_emails 1 do
      post sensei_passwords_path,
           params: {
             password: { email: teacher.email }
           }
    end
    assert_response :success
  end

  test 'should not post reset password because email is blank' do
    post sensei_passwords_path,
         params: {
           password: { email: '' }
         }
    assert_equal 'メールアドレスが空欄です', flash[:alert]
  end

  test 'should get edit' do
    teacher = forgot_password_teacher
    token = teacher.confirmation_token

    get edit_sensei_teacher_password_path(teacher, token: token)
    assert_nil flash[:alert]
    assert_redirected_to edit_sensei_teacher_password_path(teacher)
  end

  test 'should patch new password' do
    teacher = forgot_password_teacher
    token = teacher.confirmation_token
    before_password = teacher.encrypted_password

    patch sensei_teacher_password_path(teacher, token: token),
          params: {
            password_reset: {
              password: 'new_passw0rd',
              password_confirm: 'new_passw0rd'
            }
          }

    assert_redirected_to sensei_class_rooms_path
    assert_not_equal before_password, teacher.reload.encrypted_password
  end

  test 'should not patch new password because new password include only one type character' do
    teacher = forgot_password_teacher
    token = teacher.confirmation_token
    before_password = teacher.encrypted_password

    patch sensei_teacher_password_path(teacher, token: token),
          params: {
            password_reset: {
              password: 'newPassword',
              password_confirm: 'newPassword'
            }
          }

    assert_select_error_explanation('パスワードは半角の英字・数字・記号の中から2種類以上を組み合わせて入力してください')
    assert_equal before_password, teacher.reload.encrypted_password
  end

  test 'should not patch new password because new password include other than one-byte English characters, numbers, and symbols' do
    teacher = forgot_password_teacher
    token = teacher.confirmation_token
    before_password = teacher.encrypted_password

    patch sensei_teacher_password_path(teacher, token: token),
          params: {
            password_reset: {
              password: 'p阿＄ｽw0ーＤ',
              password_confirm: 'p阿＄ｽw0ーＤ'
            }
          }

    assert_select_error_explanation('パスワードは半角の英字・数字・記号以外の文字では入力できません')
    assert_equal before_password, teacher.reload.encrypted_password
  end

  test 'should error when access reset password url already used it' do
    teacher = forgot_password_teacher
    token = teacher.confirmation_token

    # Using reset password url
    patch sensei_teacher_password_path(teacher, token: token),
          params: {
            password_reset: {
              password: 'new_passw0rd',
              password_confirm: 'new_passw0rd'
            }
          }

    # Access reset password url
    get edit_sensei_teacher_password_path(teacher, token: token)

    alert = 'もう一度URLをご確認いただくか，再度登録をお試しください。'
    assert_equal alert, flash[:alert]
    assert_response :success
    assert_equal edit_sensei_teacher_password_path(teacher), path
    # Render password reset request  instead of set new password page
    assert_select 'h2', 'パスワードをリセットする'
  end
end
