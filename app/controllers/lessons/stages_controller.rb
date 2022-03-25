# frozen_string_literal: true

class Lessons::StagesController < Students::BaseController
  before_action :require_student_login

  layout 'lessons/stages/layouts/application'

  def show
    @lesson = Lesson.find_by!(number: params[:lesson_number])
    @stage = @lesson.stages.find_by!(number: params[:number])
    @workspace = Workspace.select(:id, :body, :updated_at).find_by(student: current_student, stage: @stage)
    @workspaces = Workspace.id_each_stages(current_student)
  end
end
