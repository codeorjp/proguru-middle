# frozen_string_literal: true

require 'test_helper'

class PasswordsControllerTest < ActionDispatch::IntegrationTest
  # Student set new password after token_confirmation
  def sign_in_after_initialized_as(student)
    post token_confirmation_path,
         params: {
           student: {
             class_room_id: student.class_room_id,
             number: student.number,
             initial_token: student.initial_token
           }
         }
  end

  test 'should go to new_password' do
    sign_in_after_initialized_as(students(:created))

    get new_password_path
    assert_response :success
  end

  test 'should redirect to sign_in without login session' do
    get new_password_path
    assert_redirected_to sign_in_url
  end

  test 'should set new password' do
    student = students(:created)
    sign_in_after_initialized_as(student)
    post passwords_url,
         params: {
           password_form: {
             password: 'passw0rd',
             password_confirmation: 'passw0rd'
           }
         }
    assert_redirected_to edit_student_path
    assert_equal flash[:success], 'パスワードが設定されました'
    assert_not_nil student.reload.encrypted_password
  end

  test 'should update password when the student reset' do
    student = students(:profiled)
    student.reset!
    sign_in_after_initialized_as(student)
    post passwords_url,
         params: {
           password_form: {
             password: 'passw0rd',
             password_confirmation: 'passw0rd'
           }
         }
    assert_redirected_to lessons_path
    assert_equal flash[:success], 'パスワードが設定されました'
    assert_not_nil student.reload.encrypted_password
  end

  test 'should not set new password cause password / confirm are different' do
    student = students(:created)
    sign_in_after_initialized_as(student)
    post passwords_url,
         params: {
           password_form: {
             password: 'passw0rd',
             password_confirmation: 'different_passw0rd'
           }
         }
    assert_response :unprocessable_entity
    assert_equal passwords_path, path
    assert_select_error_explanation 'パスワード（確認用）とパスワードの入力が一致しません'
    assert_nil student.reload.encrypted_password
  end

  test 'should not set new password cause password is too short' do
    student = students(:created)
    sign_in_after_initialized_as(student)
    post passwords_url,
         params: {
           password_form: {
             password: 'sh0rt',
             password_confirmation: 'sh0rt'
           }
         }
    assert_response :unprocessable_entity
    assert_equal passwords_path, path
    assert_select_error_explanation 'パスワードは8文字以上で入力してください'
    assert_nil student.reload.encrypted_password
  end

  test 'should not set new password because password includes only one type character' do
    student = students(:created)
    sign_in_after_initialized_as(student)
    post passwords_url,
         params: {
           password_form: {
             password: 'password',
             password_confirmation: 'password'
           }
         }
    assert_response :unprocessable_entity
    assert_equal passwords_path, path
    assert_select_error_explanation 'パスワードは半角の英字・数字・記号の中から2種類以上を組み合わせて入力してください'
    assert_nil student.reload.encrypted_password
  end

  test 'should not set new password because password includes other than one-byte English characters, numbers, and symbols' do
    student = students(:created)
    sign_in_after_initialized_as(student)
    post passwords_url,
         params: {
           password_form: {
             password: 'p阿＄ｽw0ーＤ',
             password_confirmation: 'p阿＄ｽw0ーＤ'
           }
         }
    assert_response :unprocessable_entity
    assert_equal passwords_path, path
    assert_select_error_explanation 'パスワードは半角の英字・数字・記号以外の文字では入力できません'
    assert_nil student.reload.encrypted_password
  end

  test 'should redirect to student edit path because the student is going to access password setting screen' do
    student = students(:passworded)
    sign_in_as(student)
    get new_password_path
    assert_redirected_to edit_student_url
    assert_equal flash[:alert], 'パスワードはすでに設定されています'
  end

  test "should redirect to student edit path because the student is going to set password when the student's status is passworded" do
    student = students(:passworded)
    sign_in_as(student)
    post passwords_url,
         params: {
           password_form: {
             password: 'passw0rd',
             password_confirmation: 'passw0rd'
           }
         }

    assert_redirected_to edit_student_url
    assert_equal flash[:alert], 'パスワードはすでに設定されています'
  end
end
