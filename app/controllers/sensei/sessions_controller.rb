# frozen_string_literal: true

class Sensei::SessionsController < Clearance::SessionsController
  layout 'sensei/layouts/application'

  def new; end

  def create
    @teacher = authenticate(params)

    sign_in(@teacher) do |status|
      if status.success?
        redirect_to sensei_class_rooms_path
      else
        flash.now[:error] = status.failure_message
        render :new, status: :bad_request
      end
    end
  end

  def url_after_destroy
    sensei_sign_in_url
  end
end
