# frozen_string_literal: true

require 'test_helper'

class SessionsControllerTest < ActionDispatch::IntegrationTest
  def setup
    @student = students(:profiled)
  end

  test 'should sign_up student' do
    get sign_up_url
    assert_response :success
  end

  test 'should go to student sign in page' do
    get sign_in_url
    assert_response :success
  end

  test 'should redirect to lessons page when a student signed in' do
    sign_in_as(@student)
    get sign_in_url

    assert_redirected_to lessons_path
    assert_nil flash[:error]
  end

  test 'should sign in student session' do
    assert_changes('@student.reload.remember_token') do
      sign_in_as(@student)
    end

    assert_redirected_to lessons_path
    assert_nil flash[:error]
    assert_equal 'ログインしました', flash[:success]
  end

  test 'should fail sign in student session because the student enter other number' do
    assert_no_changes('@student.reload.remember_token') do
      @student.number = -1
      sign_in_as(@student)
    end

    assert_response :bad_request
    assert_equal 'クラスID，出席番号，パスワードのいずれかが誤っています', flash[:error]
    assert_equal '/sessions', path
  end

  test 'should fail sign in student session because the student enter other class_room_id' do
    assert_no_changes('@student.reload.remember_token') do
      @student.class_room_id = -1
      sign_in_as(@student)
    end

    assert_response :bad_request
    assert_equal 'クラスID，出席番号，パスワードのいずれかが誤っています', flash[:error]
    assert_equal '/sessions', path
  end

  test 'should fail sign in student session cause wrong password' do
    @student.password = 'wrong_password'
    assert_no_changes('@student.reload.remember_token') do
      assert_changes('@student.reload.failed_attempts', from: 0, to: 1) do
        sign_in_as(@student)
      end
    end

    assert_response :bad_request
    assert_equal 'クラスID，出席番号，パスワードのいずれかが誤っています', flash[:error]
    assert_equal '/sessions', path
  end

  test "should fail sign in student session because the student's account is locked " do
    student = students(:account_locked)
    assert_no_changes('@student.reload.remember_token') do
      sign_in_as(student)
    end

    assert_response :bad_request
    assert_equal 'このアカウントは，ログインに10回以上失敗したためロックされています。先生にロックを解除してもらってください', flash[:error]
    assert_equal '/sessions', path
  end

  test 'should be account_locked status because the student mistype password 10 times' do
    assert_changes('@student.reload.failed_attempts', from: 0, to: Student::FAILED_ATTEMPTS_LIMIT) do
      Student::FAILED_ATTEMPTS_LIMIT.times do
        @student.password = 'wrong_password'
        assert_no_changes('@student.reload.remember_token') do
          sign_in_as(@student)
        end
      end
    end

    assert_response :bad_request
    assert @student.reload.account_locked?
    assert_equal 'このアカウントは，ログインに10回以上失敗したためロックされています。先生にロックを解除してもらってください', flash[:error]
    assert_equal '/sessions', path
  end

  test 'should success token_confirmation student' do
    student = students(:created)
    post token_confirmation_path,
         params: {
           student: {
             class_room_id: student.class_room_id,
             number: student.number,
             initial_token: student.initial_token
           }
         }

    assert_redirected_to new_password_path
    assert_nil flash[:error]
  end

  test 'should success token_confirmation student when initial_token included full-width characters is sended' do
    student = students(:created)
    post token_confirmation_path,
         params: {
           student: {
             class_room_id: student.class_room_id,
             number: student.number,
             initial_token: 'ｔoken１'
           }
         }

    assert_equal '初期パスワードは半角文字で入力してください', flash[:error]
    assert_redirected_to sign_up_url
  end

  test 'should fail token_confirmation student is initialized' do
    student = students(:passworded)
    post token_confirmation_path,
         params: {
           student: {
             class_room_id: student.class_room_id,
             number: student.number,
             initial_token: student.initial_token
           }
         }
    assert_redirected_to sign_in_path
    assert_equal 'ログインしてください', flash[:error]
  end

  test 'should fail token_confirmation initial_token is wrong' do
    student = students(:created)
    post token_confirmation_path,
         params: {
           student: {
             class_room_id: student.class_room_id,
             number: student.number,
             initial_token: 'wronng_token'
           }
         }
    assert_redirected_to sign_up_path
    assert_equal '入力に誤りがあります', flash[:error]
  end

  test 'should signed out' do
    delete sign_out_url
    assert_equal 'ログアウトしました', flash[:success]
    assert_redirected_to sign_in_path
  end
end
