# frozen_string_literal: true

class Sensei::KeywordsController < SenseiController
  before_action :require_login
  rescue_from ActiveRecord::RecordNotFound, with: :rescue_record_not_found

  def index
    @student = Student.find_own_class(params[:student_id], current_user.id)
    @keywords = @student.keywords
  end
end
