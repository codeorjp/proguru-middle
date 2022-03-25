# frozen_string_literal: true

# Preview all emails at http://localhost:3000/rails/mailers/teacher_mailer
class TeacherMailerPreview < ActionMailer::Preview
  def deliver_confirm
    teacher = Teacher.create(
      email: "#{SecureRandom.hex}@example.com",
      password: 'password',
      email_confirmation_token: Clearance::Token.new
    )
    TeacherMailer.with(teacher: teacher).deliver_confirm.deliver_now
  end
end
