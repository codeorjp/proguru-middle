# frozen_string_literal: true

require 'test_helper'

class Api::WorkspacesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @student = students(:profiled)
    @lesson = Lesson.first
    @stage = @lesson.first_stage
  end

  test 'should fetch workspace' do
    sign_in_as(@student)
    workspace = Workspace.find_by(stage: @stage, student: @student)

    get api_lesson_stage_workspaces_url(lesson_number: @lesson.number, stage_number: @stage.number), as: :json
    json = JSON.parse(@response.body)

    assert_response :success
    assert_equal json['workspace']['id'], workspace.id
    assert_equal json['workspace']['body'], workspace.body
  end

  test 'should not fetch without student login' do
    get api_lesson_stage_workspaces_url(lesson_number: @lesson.number, stage_number: @stage.number), as: :json
    json = JSON.parse(@response.body)

    assert_response :unauthorized
    assert 1, json['errors'].size
    assert_includes json['errors'], 'ログインされていません'
  end

  test 'return nil if workspace nothing' do
    sign_in_as(@student)
    lesson = Lesson.third
    stage = lesson.first_stage
    workspace = Workspace.where(stage_id: stage.id, student_id: @student.id)
    assert_empty workspace

    get api_lesson_stage_workspaces_url(lesson_number: lesson.number, stage_number: stage.number), as: :json
    json = JSON.parse(@response.body)

    assert_nil json['workspace']
  end
end
