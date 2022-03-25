# frozen_string_literal: true

class Sensei::MessageBoardsController < SenseiController
  before_action :require_login
  before_action :set_class_room
  rescue_from ActiveRecord::RecordNotFound, with: :rescue_record_not_found

  def show
    @message_board = @class_room.message_boards.find(params[:id])
    @messages = @message_board.messages.order(id: :desc)
  end

  private

    def set_class_room
      @class_room = ClassRoom.owner(current_user.id).joins(:message_boards).where(message_boards: { id: params[:id] }).last!
    end
end
