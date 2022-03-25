# frozen_string_literal: true

module Api::ErrorMessageShowable
  extend ActiveSupport::Concern

  def error_not_found_msg(klass)
    t(
      'activerecord.errors.record_not_found',
      record: t("activerecord.models.#{klass.to_s.underscore}")
    )
  end

  def rescue_record_not_found(error)
    not_found_error_message = error_not_found_msg(error.model)
    render json: { error: not_found_error_message }, status: :not_found
  end

  private

    def show_unauthorized_error_message
      unauthorized_error_message = [I18n.t('flashes.failure_when_not_signed_in')]
      render json: { errors: unauthorized_error_message }, status: :unauthorized
    end
end
