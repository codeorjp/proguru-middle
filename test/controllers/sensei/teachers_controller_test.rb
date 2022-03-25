# frozen_string_literal: true

require 'test_helper'

class Sensei::TeachersControllerTest < ActionDispatch::IntegrationTest
  test 'should get sign_up' do
    get sensei_sign_up_path
    assert_response :success
  end

  test 'should create success' do
    email = 'teacher@example.com'
    post sensei_teachers_path,
         params: {
           teacher: {
             fullname: '先生1',
             email: email,
             password: 'hoge1234'
           }
         }

    assert_response :redirect

    token = Teacher.find_by(email: email).email_confirmation_token
    assert_not_empty token

    mail = ActionMailer::Base.deliveries.last
    assert_not_nil mail
    assert_equal email, mail['to'].to_s
    assert_equal 'プログル技術へようこそ', mail['subject'].to_s

    [mail.html_part, mail.text_part].each do |part|
      assert part.body.include?(token)
    end
  end

  test 'should show error when create failed' do
    post sensei_teachers_path,
         params: {
           teacher: {
             fullname: '',
             email: '',
             password: ''
           }
         }

    assert_response :bad_request
    assert_select_error_explanation('メールアドレスは不正な値です')
    assert_select_error_explanation('メールアドレスを入力してください')
    assert_select_error_explanation('パスワードを入力してください')
    assert_select_error_explanation('氏名を入力してください')
  end

  test 'should get edit' do
    teacher = teachers(:confirmed)
    sensei_sign_in_as(teacher)
    get edit_sensei_teacher_path(teacher.id)
    assert_response :success
  end

  FILE_NAME = 'enjoy-blockly.png'
  IMAGE_FILE = "files/#{FILE_NAME}"

  test 'should update fullname & nickname' do
    fullname = '生徒1'
    nickname = '生徒1'
    image = fixture_file_upload(IMAGE_FILE)

    teacher = teachers(:confirmed)
    sensei_sign_in_as(teacher)

    patch sensei_teacher_path(teacher.id),
          params: {
            teacher: {
              fullname: fullname,
              nickname: nickname,
              icon: image
            }
          }
    assert_response :redirect
    assert_redirected_to edit_sensei_teacher_url(teacher.id)

    teacher.reload
    assert_equal fullname, teacher.fullname
    assert_equal nickname, teacher.nickname
    assert teacher.icon.attached?
  end

  test 'should not update when fullname is blank' do
    nickname = '生徒1'
    teacher = teachers(:confirmed)
    sensei_sign_in_as(teacher)

    assert_no_changes -> { teacher.reload.nickname } do
      patch sensei_teacher_path(teacher.id),
            params: {
              teacher: {
                fullname: '',
                nickname: nickname
              }
            }
      assert_response :bad_request
      assert_select_error_explanation('氏名を入力してください')
    end
  end

  test 'should update email_delivery_allowed' do
    teacher = teachers(:confirmed)
    sensei_sign_in_as(teacher)

    assert_changes('teacher.reload.email_delivery_allowed', from: true, to: false) do
      patch sensei_teacher_path(teacher.id),
            params: {
              teacher: {
                email_delivery_allowed: false
              }
            }
    end

    assert_response :redirect
    assert_redirected_to edit_sensei_teacher_url(teacher.id)
  end

  test 'should not update email_delivery_allowed because the value is determined to be NULL by DB' do
    teacher = teachers(:confirmed)
    sensei_sign_in_as(teacher)

    assert_no_changes -> { teacher.reload.nickname } do
      patch sensei_teacher_path(teacher.id),
            params: {
              teacher: {
                email_delivery_allowed: nil
              }
            }
    end

    assert_response :bad_request
    assert_select_error_explanation('メール受信可否は一覧にありません')
  end

  test 'should destroy teacher' do
    teacher = teachers(:confirmed)
    sensei_sign_in_as(teacher)

    assert_difference('Teacher.count', -1) do
      delete sensei_teacher_url(teacher)
    end

    assert_redirected_to root_path
  end

  test 'should not destroy other teacher' do
    other_teacher = teachers(:another)
    teacher = teachers(:confirmed)
    sensei_sign_in_as(teacher)

    assert_no_difference('Teacher.count') do
      delete sensei_teacher_url(other_teacher)
    end

    assert_redirected_to edit_sensei_teacher_path(teacher.id)
  end

  test 'should redirect before sign-in' do
    teacher = teachers(:confirmed)

    get edit_sensei_teacher_path(teacher.id)
    assert_redirected_to sensei_sign_in_path
  end
end
