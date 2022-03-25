# frozen_string_literal: true

# This module depends on Clearance.
# ref: https://github.com/thoughtbot/clearance/wiki/Authenticate-with-username
module Clearance::EmailOptionable
  include ActiveSupport::Concern

  private

    def email_optional?
      true
    end

    def normalize_email
      # Nothing to do: This is workaround for skip before validation of Clearance::User
      # It will be access email column, but Student model has NOT email column.
      # ref: https://github.com/thoughtbot/clearance/blob/7d6def116148d2cdd389c7c05e9119d86e6a1d3a/lib/clearance/user.rb#L158
    end
end
