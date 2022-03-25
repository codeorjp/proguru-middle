# frozen_string_literal: true

class TeacherMailer < ClearanceMailer
  default from: Clearance.configuration.mailer_sender

  def deliver_confirm
    @teacher = params[:teacher]
    mail(to: @teacher.email, subject: 'プログル技術へようこそ')
  end

  def email_change_procedure
    @teacher = params[:teacher]
    mail(to: @teacher.unconfirmed_email, subject: 'メールアドレスの変更手続きを完了させてください')
  end
end
