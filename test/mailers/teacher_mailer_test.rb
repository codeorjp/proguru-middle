# frozen_string_literal: true

require 'test_helper'
require 'helpers/mailer_helper'

class TeacherMailerTest < ActionMailer::TestCase
  include MailerHelper

  test 'deliver_confirm' do
    teacher = teachers(:unconfirmed)
    email = TeacherMailer.with(teacher: teacher).deliver_confirm

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal [Clearance.configuration.mailer_sender], email.from
    assert_equal [teacher.email], email.to
    assert_equal 'プログル技術へようこそ', email.subject
    token = teacher.email_confirmation_token
    [email.html_part, email.text_part].each do |part|
      assert_match %r{https?://#{mailer_host}/sensei/confirm_email/#{token}}, part.body.to_s
    end
  end

  test 'email_change_procedure' do
    teacher = teachers(:confirmed)
    teacher.unconfirmed_email = teachers(:unconfirmed).email
    email = TeacherMailer.with(teacher: teacher).email_change_procedure

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal [Clearance.configuration.mailer_sender], email.from
    assert_equal [teacher.unconfirmed_email], email.to
    assert_equal 'メールアドレスの変更手続きを完了させてください', email.subject
    token = teacher.email_confirmation_token
    [email.html_part, email.text_part].each do |part|
      assert_match %r{https?://#{mailer_host}/sensei/confirm_email/#{token}}, part.body.to_s
    end
  end
end
