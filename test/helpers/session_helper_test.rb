# frozen_string_literal: true

require 'test_helper'

class SessionHelperTest < ActionView::TestCase
  test 'should exists current_student when session has created student_id' do
    session[:student_remember_token] = students(:created).remember_token
    assert_not_nil current_student
  end

  test 'should exists current_student when session has passworded student_id' do
    session[:student_remember_token] = students(:passworded).remember_token
    assert_not_nil current_student
  end
end
