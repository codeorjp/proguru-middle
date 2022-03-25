# frozen_string_literal: true

require 'test_helper'
require 'aasm/minitest'

class StudentSignUpTest < ActionDispatch::IntegrationTest
  PASSWORD = 'passw0rd'

  def assert_redirect_success
    assert_response :redirect
    follow_redirect!
    assert_response :success
  end

  def post_token_confirmation(student)
    post '/token_confirmation',
         params: {
           student: {
             class_room_id: student.class_room_id,
             number: student.number,
             initial_token: student.initial_token
           }
         }
  end

  def post_passwords(password)
    post '/passwords',
         params: {
           password_form: {
             password: password,
             password_confirmation: password
           }
         }
  end

  def patch_student(nickname, icon)
    patch '/student',
          params: {
            student: {
              nickname: nickname,
              icon: icon
            }
          }
  end

  def post_sessions(student, password)
    post '/sessions',
         params: {
           student: {
             class_room_id: student.class_room_id,
             number: student.number,
             password: password
           }
         }
  end

  test 'sign up success' do
    teacher = teachers(:confirmed)
    sensei_sign_in_as(teacher)

    # A teacher registers a new student
    class_room = ClassRoom.find_by(teacher: teacher)
    number = Student.where(class_room: class_room).maximum(:number) + 1
    post "/sensei/class_rooms/#{class_room.id}/students", params: { student: { number: number } }
    assert_redirect_success
    assert_equal "/sensei/class_rooms/#{class_room.id}/students", path
    assert_equal '生徒が登録されました', flash[:notice]

    # The teacher shares id & initial token to students (Off line operation)
    student = Student.find_by!(class_room: class_room, number: number)
    assert_have_state student, :created

    # A student signing up
    get '/sign_up'
    assert_response :success

    post_token_confirmation(student)
    assert_redirect_success
    assert_equal '/passwords/new', path
    assert_have_state student.reload, :created

    post_passwords(PASSWORD)
    assert_redirect_success
    assert_equal '/student/edit', path
    assert_have_state student.reload, :passworded

    patch_student('生徒1', 'avatar1')
    assert_redirect_success
    assert_equal '/sign_in', path
    assert_have_state student.reload, :profiled

    post_sessions(student, PASSWORD)
    assert_redirect_success
    assert_equal '/lessons', path
  end

  test 'come back sign up flow when leave pages' do
    student = students(:created)

    # A student signing up
    get '/sign_up'
    assert_response :success

    # Student signed up
    post_token_confirmation(student)
    assert_redirect_success
    assert_equal '/passwords/new', path

    # Left & access sign_up page
    get '/sign_up'
    assert_redirect_success
    assert_equal '/passwords/new', path

    # Left & access lessons/1/stages/1 page
    get '/lessons/1/stages/1'
    assert_redirect_success
    assert_equal '/passwords/new', path

    # Student set password
    post_passwords(PASSWORD)
    assert_redirect_success
    assert_equal '/student/edit', path

    # Left & access sign_in page
    get '/sign_in'
    assert_redirect_success
    assert_equal '/student/edit', path

    # Left & access lessons page
    get '/lessons'
    assert_redirect_success
    assert_equal '/student/edit', path

    # Student set profile
    patch_student('生徒1', 'avatar1')
    assert_redirect_success
    assert_equal '/sign_in', path

    # Left & access sign_up page, no-redirect routing (signed out)
    get '/sign_up'
    assert_response :success
  end
end
