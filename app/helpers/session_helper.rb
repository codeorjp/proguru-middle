# frozen_string_literal: true

module SessionHelper
  def current_student
    return @current_student if defined?(@current_student)

    @current_student = Student.find_by(remember_token: session[:student_remember_token])
  end

  private

    def sign_in(student)
      reset_session
      student.reset_failed_attempts
      student.new_remember_token
      student.save
      session[:student_remember_token] = student.remember_token
    end

    def sign_out
      reset_session
      @current_student = nil
    end

    def student_signed_in?
      current_student.present?
    end
end
