# frozen_string_literal: true

require 'test_helper'

class StudentsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @student = students(:passworded)
  end

  test 'should get edit' do
    sign_in_as(@student)
    get edit_student_url
    assert_response :success
  end

  test 'should patch update' do
    sign_in_as(@student)
    patch student_url, params: { student: { nickname: '生徒1', icon: 'avatar1' } }

    @student.reload
    assert_redirected_to sign_in_path
    assert_equal '生徒1', @student.nickname
    assert_equal 'avatar1', @student.icon
  end

  test 'should patch update when profile change' do
    @student = students(:profiled)
    sign_in_as(@student)
    patch student_url, params: { student: { nickname: '生徒1', icon: 'avatar1' } }

    @student.reload
    assert_redirected_to lessons_path
    assert_equal '生徒1', @student.nickname
    assert_equal 'avatar1', @student.icon
  end

  test 'should not patch update without blank params' do
    sign_in_as(@student)
    patch student_url, params: { student: { nickname: '' } }

    @student.reload
    assert_equal student_path, path
    assert_nil @student.nickname
    assert_nil @student.icon
  end

  test 'should redirect before sign-in' do
    get edit_student_url
    assert_redirected_to sign_in_path

    patch student_url
    assert_redirected_to sign_in_path
  end
end
