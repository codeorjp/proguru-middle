# frozen_string_literal: true

require 'test_helper'

class Sensei::WorkspacesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @student = students(:profiled)
    @teacher = @student.class_room.teacher
  end

  test 'should get index' do
    sensei_sign_in_as(@teacher)
    get sensei_student_workspaces_path(@student)
    assert_response :success
  end

  test 'should get show' do
    sensei_sign_in_as(@teacher)
    workspace = @student.workspaces.first

    get sensei_workspace_path(workspace)
    assert_response :success
  end

  test "should redirect another teacher's student's workspace" do
    sensei_sign_in_as(@teacher)
    other_class_room = ClassRoom.find_by(teacher: teachers(:another))
    student = other_class_room.students.first

    get sensei_workspace_path(student.workspaces.first)
    assert_redirected_to sensei_class_rooms_url
  end

  test 'should redirect teacher without sign in' do
    get sensei_student_workspaces_path(@student)
    assert_redirected_to sensei_sign_in_url

    workspace = workspaces(:one)
    get sensei_workspace_path(workspace)
    assert_redirected_to sensei_sign_in_url
  end
end
