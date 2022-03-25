# frozen_string_literal: true

class Sensei::ChangePasswordsController < SenseiController
  before_action :require_login

  def edit
    @form = Sensei::ChangePasswordForm.new
  end

  def update
    @form = Sensei::ChangePasswordForm.new(form_params.merge(teacher: current_user))
    if @form.valid? && current_user.update_password(@form.new_password)
      sign_in current_user
      flash[:success] = t('.success')
      redirect_to edit_sensei_teacher_path(current_user)
    else
      @form.errors.merge!(current_user.errors)
      render :edit, status: :unprocessable_entity
    end
  end

  def form_params
    params.require(:sensei_change_password_form)
          .permit(:current_password, :new_password, :new_password_confirmation)
  end
end
