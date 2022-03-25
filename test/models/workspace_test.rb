# frozen_string_literal: true

require 'test_helper'

class WorkspaceTest < ActiveSupport::TestCase
  setup do
    @workspace = workspaces(:one)
  end

  test 'unique stage scope student' do
    workspace = Workspace.new(
      stage: @workspace.stage,
      student: @workspace.student,
      body: 'not unique'
    )
    assert_not workspace.valid?
  end

  test '.id_each_stages take workspace each stages' do
    actual = Workspace.id_each_stages(@workspace.student)

    expect = { @workspace.stage_id => @workspace.id }
    assert_equal expect, actual
  end

  test ".id_each_stages blank when workspaces didn't find" do
    workspace = Workspace.id_each_stages(students(:two))
    assert_empty workspace
  end
end
