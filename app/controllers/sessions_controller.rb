# frozen_string_literal: true

class SessionsController < Students::BaseController
  skip_before_action :signup_guard, only: [:token_confirmation]

  def sign_up
    redirect_to lessons_path if student_signed_in?
  end

  def new
    redirect_to lessons_path if student_signed_in?
  end

  def create
    student = find_by_class_and_number(params)
    if student.nil?
      flash[:error] = t('.error')
      return render :new, status: :bad_request
    end

    if student.unlocked_and_authenticated?(params[:student][:password])
      sign_in(student)
      flash[:success] = t('.success')
      return redirect_to lessons_path
    end

    student.sign_in_failed
    flash[:error] = student.account_locked? ? t('.account_locked') : t('.error')
    render :new, status: :bad_request
  end

  def token_confirmation
    student = token_authenticate(params)
    if student.nil?
      flash[:error] = t('.error')
      check_entered_initial_token_is_full_width(params)
      return redirect_to sign_up_path
    end

    if student.created?
      sign_in(student)
      redirect_to new_password_path
    else
      flash[:error] = t('.already_signed_up_error')
      redirect_to sign_in_path
    end
  end

  def destroy
    sign_out
    flash[:success] = t('.success')
    redirect_to sign_in_path
  end

  private

    def find_by_class_and_number(params)
      Student.find_by_class_and_number(
        params[:student][:class_room_id],
        params[:student][:number]
      )
    end

    def token_authenticate(params)
      Student.token_authenticate(
        params[:student][:class_room_id],
        params[:student][:number],
        params[:student][:initial_token]
      )
    end

    def check_entered_initial_token_is_full_width(params)
      checked_student = find_by_class_and_number(params)
      flash[:error] = t('.enter_initial_token_half_width_characters') if checked_student && both_full_and_half_match?(checked_student, params[:student][:initial_token])
    end

    def both_full_and_half_match?(checked_student, entered_initial_token)
      checked_student.initial_token == entered_initial_token&.tr('０-９ａ-ｚ', '0-9a-z')
    end
end
