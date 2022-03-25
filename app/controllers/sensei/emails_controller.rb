# frozen_string_literal: true

class Sensei::EmailsController < SenseiController
  before_action :require_login, only: [:edit]

  def edit
    @teacher = current_user
  end

  def update
    @teacher = current_user
    if @teacher.email == params[:teacher][:email]
      flash[:error] = '入力されたメールアドレスは既に使用されています'
      render :edit
    else
      @teacher.unconfirmed_email = params[:teacher][:email]
      @teacher.email_confirmation_token = Clearance::Token.new
      if @teacher.save
        TeacherMailer.with(teacher: @teacher).email_change_procedure.deliver
        redirect_to sensei_unconfirm_email_path
      else
        render :edit
      end
    end
  end
end
