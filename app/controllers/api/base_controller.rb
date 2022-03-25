# frozen_string_literal: true

class Api::BaseController < ApplicationController
  include Api::BaseHelper
  include Api::ErrorMessageShowable

  private

    def require_student_login
      return if student_signed_in?

      show_unauthorized_error_message
    end
end
