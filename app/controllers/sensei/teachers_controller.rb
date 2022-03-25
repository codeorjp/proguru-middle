# frozen_string_literal: true

class Sensei::TeachersController < Clearance::UsersController
  before_action :require_login, only: [:edit]
  layout 'sensei/layouts/application'

  def new
    @teacher = Teacher.new
  end

  def create
    @teacher = Teacher.new(teacher_params)

    if @teacher.save
      TeacherMailer.with(teacher: @teacher).deliver_confirm.deliver
      redirect_to sensei_unconfirm_email_path
    else
      render :new, status: :bad_request
    end
  end

  def edit
    @teacher = current_user
  end

  def update
    @teacher = current_user
    if @teacher.update(edit_params)
      redirect_to edit_sensei_teacher_url(@teacher.id), notice: t('.success')
    else
      render :edit, status: :bad_request
    end
  end

  def destroy
    @teacher = current_user
    if @teacher.id == params[:id].to_i && @teacher.destroy
      respond_to do |format|
        format.html { redirect_to root_path, notice: t('.success') }
      end
    else
      redirect_to edit_sensei_teacher_path(@teacher.id)
    end
  end

  private

    def teacher_params
      params.require(:teacher).permit(:fullname, :email, :password)
    end

    def edit_params
      params.require(:teacher).permit(:fullname, :nickname, :icon, :email_delivery_allowed)
    end
end
