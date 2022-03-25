# frozen_string_literal: true

class ApplicationController < ActionController::Base
  include Clearance::Controller

  if Rails.env.staging?
    http_basic_authenticate_with name: Rails.application.credentials.basic_auth_user,
                                 password: Rails.application.credentials.basic_auth_pass
  end

  before_action :set_raven_context

  def url_after_denied_access_when_signed_out
    sensei_sign_in_url
  end

  private

    def set_raven_context
      Raven.extra_context(params: params.to_unsafe_h, url: request.url)
    end
end
