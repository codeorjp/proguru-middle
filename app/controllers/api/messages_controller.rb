# frozen_string_literal: true

class Api::MessagesController < Api::BaseController
  before_action :require_student_login

  def index
    @messages = Message.includes(:sender)
                       .with_attached_image
                       .board(current_student.class_room_id, params[:kind])
                       .before(params[:first_id])
                       .after(params[:last_id])
                       .last(20)
    respond_to { |format| format.json }
  end

  def create
    message_form = MessageForm.new(
      message_params.merge(sender: current_student)
    )
    send_success = message_form.save
    if send_success
      render json: send_success, status: :created
    else
      render json: { errors: message_form.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def message_params
      params.permit(:body, :kind, :image)
    end
end
