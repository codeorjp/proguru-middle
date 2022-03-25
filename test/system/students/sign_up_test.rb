# frozen_string_literal: true

require 'application_system_test_case'

class SignUpTest < ApplicationSystemTestCase
  PASSWORD = 'passw0rd'

  setup do
    @student = students(:created)
    sensei_sign_in_as(@student.class_room.teacher)
  end

  test 'students signs up' do
    visit sign_up_url
    fill_in 'クラスID', with: @student.class_room_id
    fill_in '出席番号', with: @student.number
    fill_in '初期パスワード', with: @student.initial_token
    click_on 'アカウントを作成する'

    fill_in 'input_student_password', with: PASSWORD
    fill_in 'input_student_password_confirm', with: PASSWORD
    click_on 'パスワードを更新する'

    assert_text 'パスワードが設定されました'

    fill_in 'ニックネーム', with: '生徒1'
    choose 'student_icon_avatar1'
    click_on '更新する'

    fill_in 'クラスID', with: @student.class_room_id
    fill_in '出席番号', with: @student.number
    fill_in 'パスワード', with: PASSWORD
    click_on 'ログインする'

    assert_text 'ログインしました'
  end

  test 'student signs up if a session is reset' do
    visit sign_up_url
    fill_in 'クラスID', with: @student.class_room_id
    fill_in '出席番号', with: @student.number
    fill_in '初期パスワード', with: @student.initial_token
    click_on 'アカウントを作成する'

    Capybara.current_session.reset!

    visit sign_up_url
    fill_in 'クラスID', with: @student.class_room_id
    fill_in '出席番号', with: @student.number
    fill_in '初期パスワード', with: @student.initial_token
    click_on 'アカウントを作成する'

    fill_in 'input_student_password', with: PASSWORD
    fill_in 'input_student_password_confirm', with: PASSWORD
    click_on 'パスワードを更新する'

    assert_text 'パスワードが設定されました'
  end
end
