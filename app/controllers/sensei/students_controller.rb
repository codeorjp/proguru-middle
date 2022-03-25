# frozen_string_literal: true

class Sensei::StudentsController < SenseiController
  before_action :require_login
  before_action :student_by_id, only: [:edit, :update, :destroy]
  before_action only: [:reset, :unlock] do
    student_by_id(id: params[:student_id])
  end
  rescue_from ActiveRecord::RecordNotFound, with: :rescue_record_not_found

  # GET /class_rooms/:class_room_id/students
  def index
    set_class_room
    @students = Student.where(class_room: @class_room)
  end

  # GET /class_rooms/:class_room_id/students/new
  def new
    @student = Student.new(class_room_id: params[:class_room_id])
  end

  # GET /students/1/edit
  def edit; end

  # POST /class_rooms/:class_room_id/students
  def create
    set_class_room
    return if @class_room.nil?

    @student = Student.new(student_params.merge(class_room_id: @class_room.id))
    @student.new_tokens

    respond_to do |format|
      if @student.save
        format.html { redirect_to sensei_class_room_students_path(@class_room.id), notice: t('.success') }
      else
        format.html { render :new }
      end
    end
  end

  # PATCH/PUT /students/1
  def update
    respond_to do |format|
      if @student.update(student_params)
        format.html { redirect_to sensei_class_room_students_path(@student.class_room_id), notice: t('.success') }
      else
        format.html { render :edit }
      end
    end
  end

  # DELETE /students/1
  def destroy
    class_room_id = @student.class_room_id
    @student.destroy
    respond_to do |format|
      format.html { redirect_to sensei_class_room_students_url(class_room_id), notice: t('.success') }
    end
  end

  def reset
    @student.reset!
    redirect_to sensei_class_room_students_path(@student.class_room), notice: t('.success')
  end

  def unlock
    @student.unlock_account!
    redirect_to sensei_class_room_students_path(@student.class_room), notice: t('.success')
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def student_by_id(id: params[:id])
      @student = Student.find_own_class(id, current_user.id)
    end

    def set_class_room
      @class_room = ClassRoom.owner(current_user.id)
                             .find(params[:class_room_id])
    end

    def student_params
      params.require(:student).permit(:number)
    end
end
