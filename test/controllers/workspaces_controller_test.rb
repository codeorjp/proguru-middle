# frozen_string_literal: true

require 'test_helper'

class WorkspacesControllerTest < ActionDispatch::IntegrationTest
  setup do
    @student = students(:profiled)
    @stage = Stage.second
    @lesson = @stage.lesson
  end

  test 'redirect_to before sign_in' do
    post workspaces_url, params: { stage_id: @stage.id, body: 'test' }
    assert_redirected_to sign_in_url
  end

  test 'should create workspace by student and go next stage' do
    sign_in_as(@student)
    assert_difference('Workspace.count') do
      post workspaces_url, params: { stage_id: @stage.id, body: 'test' }
    end

    assert_equal '提出しました', flash[:success]
    assert_redirected_to lesson_stage_url(lesson_number: @lesson.number, number: Stage.find(@stage.next_id).number)
  end

  test 'should update workspace when exists for student-stage pair' do
    sign_in_as(@student)
    workspace = Workspace.create(stage: @stage, student: @student, body: 'from body')

    assert_no_difference('Workspace.count') do
      assert_changes -> { workspace.reload.body } do
        post workspaces_url, params: { stage_id: @stage.id, body: 'to body' }
      end
    end

    assert_equal '提出しました', flash[:success]
    assert_redirected_to lesson_stage_url(lesson_number: @lesson.number, number: Stage.find(@stage.next_id).number)
  end

  test 'go finish when created last stage workspace' do
    sign_in_as(@student)
    last_stage = @lesson.stages.find_by(next_id: nil)
    post workspaces_url, params: { stage_id: last_stage.id, body: 'test' }

    # "ログインしました" が表示される？
    # assert_equal '提出しました', flash[:success]
    assert_redirected_to lesson_finish_url(lesson_number: @lesson.number)
  end

  test 'faild create workspace' do
    sign_in_as(@student)
    post workspaces_url, params: { stage_id: @stage.id }

    assert_equal '提出に失敗しました', flash[:error]
    assert_redirected_to lesson_stage_url(lesson_number: @lesson.number, number: @stage.number)
  end

  test 'not found when post with strange stage' do
    sign_in_as(@student)
    strange_id = Stage.maximum(:id) + 1
    post workspaces_url, params: { stage_id: strange_id, body: 'test' }

    assert_equal '提出先が見つかりません', flash[:error]
    assert_redirected_to lessons_url
  end
end
