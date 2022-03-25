# frozen_string_literal: true

class Sensei::ClassRoomsController < SenseiController
  before_action :require_login
  before_action :set_class_room, only: [:edit, :update, :destroy]
  rescue_from ActiveRecord::RecordNotFound, with: :rescue_record_not_found

  # GET /class_rooms
  def index
    @class_rooms = ClassRoom.eager_load(:term, :message_boards)
                            .owner(current_user.id)
                            .merge(MessageBoard.performance)

    @student_counts = Student.where(class_room_id: @class_rooms.ids)
                             .group(:class_room_id)
                             .count(:id)
  end

  # GET /class_rooms/new
  def new
    @class_room = ClassRoomForm.new
  end

  # GET /class_rooms/1/edit
  def edit; end

  # POST /class_rooms
  def create
    @class_room = ClassRoomForm.new(
      class_room_form_params.merge(teacher_id: current_user.id)
    )

    if @class_room.save
      redirect_to sensei_class_rooms_url, notice: t('.success')
    else
      render :new
    end
  end

  # PATCH/PUT /class_rooms/1
  def update
    respond_to do |format|
      if @class_room.update(class_room_params)
        format.html { redirect_to sensei_class_rooms_url, notice: t('.success') }
      else
        format.html { render :edit }
      end
    end
  end

  # DELETE /class_rooms/1
  def destroy
    @class_room.destroy
    respond_to do |format|
      format.html { redirect_to sensei_class_rooms_url, notice: t('.success') }
    end
  end

  private

    # Use callbacks to share common setup or constraints between actions.
    def set_class_room
      @class_room = ClassRoom.owner(current_user.id).find(params[:id])
    end

    def class_room_params
      params.require(:class_room).permit(:school_year, :name)
    end

    def class_room_form_params
      params.require(:class_room_form).permit(:school_year, :name, :students_count)
    end
end
