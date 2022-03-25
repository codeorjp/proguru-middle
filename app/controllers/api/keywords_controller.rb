# frozen_string_literal: true

class Api::KeywordsController < Api::BaseController
  before_action :require_student_login

  def index
    @keywords = Keyword.owner(current_student)
    respond_to { |format| format.json }
  end
end
