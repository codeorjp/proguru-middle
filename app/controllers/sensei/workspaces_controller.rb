# frozen_string_literal: true

class Sensei::WorkspacesController < SenseiController
  before_action :require_login
  rescue_from ActiveRecord::RecordNotFound, with: :rescue_record_not_found

  def index
    @student = Student.find_own_class(params[:student_id], current_user.id)
    @lessons = Lesson.eager_load(:stages)
    # Student submits some result for a stage.
    # Teacher is able to check only last submitted result now.
    @workspaces = Workspace.id_each_stages(@student)
  end

  def show
    @workspace = Workspace.find(params[:id])
    @student = Student.find_own_class(@workspace.student_id, current_user.id)
    @stage = @workspace.stage
    @lesson = @stage.lesson
  end
end
