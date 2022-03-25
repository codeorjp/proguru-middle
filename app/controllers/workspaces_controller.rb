# frozen_string_literal: true

class WorkspacesController < Students::BaseController
  before_action :require_student_login
  before_action :set_stage

  def create
    workspace = Workspace.find_or_initialize_by(stage: @stage, student: current_student)
    workspace.body = params[:body]

    if workspace.save
      redirect_to(lesson_finish_path(lesson_number: @stage.lesson.number)) && return if @stage.next_id.nil?

      flash[:success] = t('.success')
      redirect_stage_to(Stage.find(@stage.next_id))
    else
      flash[:error] = t('.error')
      redirect_stage_to(@stage)
    end
  end

  private

    def set_stage
      @stage = Stage.find(params[:stage_id])
    rescue ActiveRecord::RecordNotFound
      flash[:error] = t('.not_found')
      redirect_to lessons_url
    end

    def redirect_stage_to(stage)
      redirect_to lesson_stage_path(lesson_number: stage.lesson.number, number: stage.number)
    end
end
