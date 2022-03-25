# frozen_string_literal: true

class Api::WorkspacesController < Api::BaseController
  before_action :require_student_login
  rescue_from ActiveRecord::RecordNotFound, with: :rescue_record_not_found

  def index
    lesson = Lesson.find_by!(number: params[:lesson_number])
    stage = lesson.stages.find_by!(number: params[:stage_number])
    @workspace = Workspace.for_restore_find_uniq_by(current_student, stage)
    respond_to { |format| format.json }
  end

  private

    def workspace_params
      params.permit(:stage_id)
    end
end
