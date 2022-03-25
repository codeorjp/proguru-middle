# frozen_string_literal: true

class Api::SayHellosController < Api::BaseController
  before_action :require_student_login

  include Api::SayHelloHelper

  def create
    form = SayHelloForm.new(
      message_params.merge(sender: current_student, kind: 'lesson')
    )
    send_success = form.save
    if send_success
      render json: { reply: reply(form.body, form.hour) }, status: :created
    else
      render json: { errors: form.errors.full_messages }, status: :unprocessable_entity
    end
  end

  private

    def message_params
      params.permit(:body, :hour)
    end
end
