# frozen_string_literal: true

require 'test_helper'
require 'helpers/mailer_helper'

class ClearanceMailerTest < ActionMailer::TestCase
  include MailerHelper

  # ref: https://github.com/thoughtbot/clearance/blob/facd174cc5c131ee86d17bed168364070fa4c292/app/mailers/clearance_mailer.rb#L2
  test 'should change_password for sensei reset password' do
    teacher = teachers(:confirmed)
    teacher.forgot_password!
    email = ClearanceMailer.change_password(teacher)

    assert_emails 1 do
      email.deliver_now
    end

    assert_equal [Clearance.configuration.mailer_sender], email.from
    assert_equal [teacher.email], email.to
    assert_equal 'パスワードをリセットしてください', email.subject

    token = teacher.confirmation_token
    [email.html_part, email.text_part].each do |part|
      assert_match %r{https?://#{mailer_host}/sensei/teachers/#{teacher.id}/password/edit\?token=#{token}}, part.body.to_s
    end
  end
end
