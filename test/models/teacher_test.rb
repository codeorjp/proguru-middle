# frozen_string_literal: true

require 'test_helper'

class TeacherTest < ActiveSupport::TestCase
  test '#initialize' do
    teacher = Teacher.new
    assert_not_nil teacher.email_confirmation_token
    assert teacher.email_confirmation_token.size == 40
  end

  test 'confirm_email' do
    teacher = teachers(:unconfirmed)

    teacher.confirm_email
    assert teacher.email_confirmed_at.present?
  end
end
