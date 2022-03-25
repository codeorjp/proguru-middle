# frozen_string_literal: true

class SenseiController < ApplicationController
  layout 'sensei/layouts/application'

  def error_not_found_msg(klass)
    t(
      'activerecord.errors.record_not_found',
      record: t("activerecord.models.#{klass.to_s.underscore}")
    )
  end

  def rescue_record_not_found(error)
    flash[:error] = error_not_found_msg(error.model)
    redirect_to sensei_class_rooms_path
  end

  private

    def set_raven_context
      super
      Raven.user_context(id: current_user&.id, ip_address: request.ip, user_type: current_user&.class&.name)
    end
end
