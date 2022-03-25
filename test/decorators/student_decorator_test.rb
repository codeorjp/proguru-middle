# frozen_string_literal: true

require 'test_helper'

class StudentDecoratorTest < ActiveSupport::TestCase
  def setup
    @student = Student.new(icon: :avatar1).extend StudentDecorator
  end

  test 'should return student icon_url' do
    expect = '/images/avatar1.png'
    assert_equal expect, @student.icon_url
  end
end
