# frozen_string_literal: true

class Api::Sensei::BaseController < ApplicationController
  include Clearance::Controller
  include Api::ErrorMessageShowable

  private

    def require_login
      return if signed_in?

      show_unauthorized_error_message
    end
end
