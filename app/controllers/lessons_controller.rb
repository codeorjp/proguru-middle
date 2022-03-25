# frozen_string_literal: true

class LessonsController < Students::BaseController
  before_action :require_student_login

  # GET /lessons
  def index
    @class_room = ClassRoom.find_by(id: current_student.class_room_id)
    @lessons = Lesson.eager_load(:stages)
    @stage_counts = Stage.group(:lesson_id).count(:id)
    @workspace_counts = Workspace.eager_load(:stage)
                                 .where(student: current_student)
                                 .group(:lesson_id)
                                 .distinct
                                 .count(:stage_id)
  end

  def finish
    @lesson = Lesson.find_by!(number: params[:lesson_number])
    @workspaces = Workspace.id_each_stages(current_student)
  end
end
