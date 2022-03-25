# frozen_string_literal: true

class Sensei::PasswordsController < Clearance::PasswordsController
  SENSEI_VIEW_PATH = Rails.root.join('app/views/sensei').to_s

  layout 'sensei/layouts/application'
  prepend_view_path SENSEI_VIEW_PATH

  private

    def flash_failure_after_update
      # Validation error message show in partial template instead of flash.
    end
end
