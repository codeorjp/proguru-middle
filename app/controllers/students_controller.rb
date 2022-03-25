# frozen_string_literal: true

class StudentsController < Students::BaseController
  before_action :require_student_login
  skip_before_action :signup_guard, only: [:edit, :update]

  def edit
    @student = current_student
  end

  def update
    passworded_before = current_student.passworded?
    @student = StudentProfileForm.new(
      student_params.merge(student: current_student)
    )
    if @student.save
      # Sign out when student is in first sign up flow
      if passworded_before
        sign_out
        redirect_to sign_in_path
      # Return lessons page when student update profile from mypage
      else
        redirect_to lessons_path
      end
    else
      render :edit, status: :unprocessable_entity
    end
  end

  private

    def student_params
      params.require(:student).permit(:nickname, :icon)
    end
end
