# frozen_string_literal: true

class TrialController < ApplicationController
  layout 'trial/layouts/application'

  def index; end

  def show
    if permit_params.include?(params[:id])
      @lesson = params[:id]
    else
      redirect_to trial_index_path
    end
  end

  private

    def permit_params
      %w[1 3 4]
    end
end
