# frozen_string_literal: true

class TermsController < Students::BaseController
  before_action :require_student_login

  def show
    @term = Term.find_by(class_room_id: current_student.class_room_id)
  end
end
