# frozen_string_literal: true

class HelpController < Students::BaseController
  before_action :require_student_login

  def index; end
end
