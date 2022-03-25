# frozen_string_literal: true

require 'test_helper'

class Sensei::ChangePasswordsControllerTest < ActionDispatch::IntegrationTest
  CURRENT_PASSWORD = 'passw0rd'
  NEW_PASSWORD = 'passw0rd_new'

  setup do
    @teacher = teachers(:confirmed)
  end

  test 'should get edit' do
    sensei_sign_in_as(@teacher)
    get edit_sensei_change_password_path
    assert_response :success
  end

  test 'should update password' do
    sensei_sign_in_as(@teacher)
    patch sensei_change_password_path,
          params: {
            sensei_change_password_form: {
              current_password: CURRENT_PASSWORD,
              new_password: NEW_PASSWORD,
              new_password_confirmation: NEW_PASSWORD
            }
          }
    assert_redirected_to edit_sensei_teacher_path(@teacher)
    assert_equal flash[:success], 'パスワードを変更しました'
    assert @teacher.reload.authenticated?(NEW_PASSWORD)
  end

  test 'should not update because current_password is nil' do
    sensei_sign_in_as(@teacher)
    patch sensei_change_password_path,
          params: {
            sensei_change_password_form: {
              current_password: nil,
              new_password: NEW_PASSWORD,
              new_password_confirmation: NEW_PASSWORD
            }
          }
    assert_response :unprocessable_entity
    assert_select_error_explanation('現在のパスワードを入力してください')
    assert_equal sensei_change_password_path, path
  end

  test 'should not update because password is nil' do
    sensei_sign_in_as(@teacher)
    patch sensei_change_password_path,
          params: {
            sensei_change_password_form: {
              current_password: CURRENT_PASSWORD,
              new_password: nil,
              new_password_confirmation: NEW_PASSWORD
            }
          }
    assert_response :unprocessable_entity
    assert_select_error_explanation('新しいパスワードを入力してください')
    assert_equal sensei_change_password_path, path
  end

  test 'should not update because password_confirm is nil' do
    sensei_sign_in_as(@teacher)
    patch sensei_change_password_path,
          params: {
            sensei_change_password_form: {
              current_password: CURRENT_PASSWORD,
              new_password: NEW_PASSWORD,
              new_password_confirmation: nil
            }
          }
    assert_response :unprocessable_entity
    assert_select_error_explanation('新しいパスワード（確認用）を入力してください')
    assert_equal sensei_change_password_path, path
  end

  test 'should not update because password & confirm are different' do
    sensei_sign_in_as(@teacher)
    patch sensei_change_password_path,
          params: {
            sensei_change_password_form: {
              current_password: CURRENT_PASSWORD,
              new_password: NEW_PASSWORD,
              new_password_confirmation: 'new_password'
            }
          }
    assert_response :unprocessable_entity
    assert_select_error_explanation('新しいパスワード（確認用）と新しいパスワードの入力が一致しません')
    assert_equal sensei_change_password_path, path
  end

  test 'should not update because current_password is incorrect' do
    sensei_sign_in_as(@teacher)
    patch sensei_change_password_path,
          params: {
            sensei_change_password_form: {
              current_password: 'incorrect_passw0rd',
              new_password: NEW_PASSWORD,
              new_password_confirmation: NEW_PASSWORD
            }
          }
    assert_response :unprocessable_entity
    assert_select_error_explanation('現在のパスワードが一致しません')
    assert_equal sensei_change_password_path, path
  end

  test 'should not update because new_password includes only one type character' do
    sensei_sign_in_as(@teacher)
    patch sensei_change_password_path,
          params: {
            sensei_change_password_form: {
              current_password: CURRENT_PASSWORD,
              new_password: 'password',
              new_password_confirmation: 'password'
            }
          }
    assert_response :unprocessable_entity
    assert_select_error_explanation('新しいパスワードは半角の英字・数字・記号の中から2種類以上を組み合わせて入力してください')
    assert_equal sensei_change_password_path, path
  end

  test 'should not update because new_password include other than one-byte English characters, numbers, and symbols' do
    sensei_sign_in_as(@teacher)
    patch sensei_change_password_path,
          params: {
            sensei_change_password_form: {
              current_password: CURRENT_PASSWORD,
              new_password: 'p阿＄ｽw0ーＤ',
              new_password_confirmation: 'p阿＄ｽw0ーＤ'
            }
          }
    assert_response :unprocessable_entity
    assert_select_error_explanation('新しいパスワードは半角の英字・数字・記号以外の文字では入力できません')
    assert_equal sensei_change_password_path, path
  end

  test 'should redirect before sign-in' do
    get edit_sensei_change_password_url
    assert_redirected_to sensei_sign_in_path

    patch sensei_change_password_url
    assert_redirected_to sensei_sign_in_path
  end
end
