# frozen_string_literal: true

module MailerHelper
  def mailer_host
    Rails.configuration.action_mailer.default_url_options[:host]
  end
end
