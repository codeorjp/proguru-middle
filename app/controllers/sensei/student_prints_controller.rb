# frozen_string_literal: true

class Sensei::StudentPrintsController < SenseiController
  before_action :require_login
  before_action :set_class_room
  rescue_from ActiveRecord::RecordNotFound, with: :rescue_record_not_found

  layout false

  def index
    @students = Student.created
                       .where(class_room_id: @class_room.id)
                       .select(:class_room_id, :number, :initial_token)
                       .order(:number)
                       .to_a
    respond_to do |format|
      format.html
      format.csv do
        send_data render_to_string, filename: 'initial_passwords.csv', type: :csv
      end
    end
  end

  private

    def set_class_room
      @class_room = ClassRoom.owner(current_user.id).find(params[:class_room_id])
    end
end
