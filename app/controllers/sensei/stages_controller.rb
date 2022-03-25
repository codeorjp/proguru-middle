# frozen_string_literal: true

class Sensei::StagesController < SenseiController
  before_action :require_login
  before_action :set_class_room
  rescue_from ActiveRecord::RecordNotFound, with: :rescue_record_not_found

  STUDENTS_PER_PAGE = 10

  def index
    @lessons = Lesson.eager_load(:stages)
    @workspaces = Workspace.joins(:student)
                           .where(students: { class_room: @class_room })
                           .group(:stage_id)
                           .count(:student_id)
    @num_of_students = Student.where(class_room: @class_room).count(:id)
  end

  def show
    @stage = Stage.find(params[:id])
    @lesson = @stage.lesson
    @students = Student.where(class_room: @class_room)
                       .order(:id)
                       .paginate(page: params[:page], per_page: STUDENTS_PER_PAGE)

    @workspaces = Workspace.where(stage: @stage, student: @students.to_a)
                           .group_by(&:student_id)
  end

  private

    def set_class_room
      @class_room = ClassRoom.owner(current_user.id).find(params[:class_room_id])
    end
end
