# frozen_string_literal: true

class Students::BaseController < ApplicationController
  rescue_from ActiveRecord::RecordNotFound, with: :record_not_found
  include Students::BaseHelper

  before_action :signup_guard

  layout 'students/layouts/application'

  private

    def require_student_login
      return if student_signed_in?

      deny_student_access(I18n.t('flashes.failure_when_not_signed_in'))
    end

    def set_raven_context
      super
      Raven.user_context(id: current_student&.id, ip_address: request.ip, user_type: current_student&.class&.name)
    end

    def signup_guard
      return unless student_signed_in?

      if current_student.created?
        redirect_to new_password_path
      elsif current_student.passworded?
        redirect_to edit_student_path
      end
    end

    def deny_student_access(flash_message = nil)
      respond_to do |format|
        format.any(:js, :json, :xml) { head :unauthorized }
        format.any { redirect_student_request(flash_message) }
      end
    end

    def redirect_student_request(flash_message)
      if flash_message
        flash[:alert] = flash_message
      end

      redirect_to sign_in_path
    end

    def record_not_found
      render(file: 'public/404.html', layout: false, status: :not_found, content_type: 'text/html')
    end
end
