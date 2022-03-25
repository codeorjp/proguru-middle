# frozen_string_literal: true

class Sensei::EmailConfirmationsController < SenseiController
  def update
    teacher = Teacher.find_by!(email_confirmation_token: params[:token])
    teacher.confirm_email
    if current_user.present?
      flash[:success] = 'メールアドレスが変更されました'
      redirect_to sensei_class_rooms_path
    else
      flash[:success] = 'プログル技術のご利用登録が完了しました'
      redirect_to sensei_sign_in_path
    end
  end

  def show; end
end
