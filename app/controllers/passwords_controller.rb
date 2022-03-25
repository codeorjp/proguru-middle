# frozen_string_literal: true

class PasswordsController < Students::BaseController
  before_action :require_student_login
  skip_before_action :signup_guard
  before_action :avoid_student_setting_password

  def new
    @form = PasswordForm.new
  end

  def create
    @form = PasswordForm.new(password_params)
    if @form.valid? && current_student.set_password!(@form.password)
      flash[:success] = 'パスワードが設定されました'
      if current_student.profiled?
        redirect_to lessons_path
      else
        redirect_to edit_student_path
      end
    else
      render :new, status: :unprocessable_entity
    end
  end

  private

    def password_params
      params.require(:password_form).permit(:password, :password_confirmation)
    end

    def avoid_student_setting_password
      flash_alert_when_password_is_already_set = 'パスワードはすでに設定されています'
      if current_student.passworded?
        redirect_to edit_student_url
        flash[:alert] = flash_alert_when_password_is_already_set
      elsif current_student.profiled?
        redirect_to lessons_url
        flash[:alert] = flash_alert_when_password_is_already_set
      end
    end
end
