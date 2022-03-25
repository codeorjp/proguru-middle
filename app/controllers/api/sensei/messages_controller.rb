# frozen_string_literal: true

class Api::Sensei::MessagesController < Api::Sensei::BaseController
  before_action :require_login
  before_action :set_class_room
  rescue_from ActiveRecord::RecordNotFound, with: :rescue_record_not_found

  MESSAGES_PER_PAGE = 50

  def index
    @messages = Message.includes(:sender)
                       .with_attached_image
                       .board(@class_room.id, params[:kind])
                       .order(id: :desc)
                       .paginate(page: params[:page], per_page: MESSAGES_PER_PAGE)

    respond_to { |format| format.json }
  end

  def destroy
    @message = Message.joins(:message_board).where(message_boards: { class_room_id: @class_room.id }).find(params[:id])
    @message.destroy
  end

  # DELETE /api/sensei/class_rooms/:class_room_id/messages/delete_messages
  def delete_messages
    ids = params[:message][:ids]
    messages = Message.joins(:message_board).where(message_boards: { class_room_id: @class_room.id })
    if messages.destroy(ids)
      head :no_content
    else
      head :unprocessable_entity
    end
  end

  private

    def set_class_room
      @class_room = ClassRoom.owner(current_user.id).find(params[:class_room_id])
    end
end
