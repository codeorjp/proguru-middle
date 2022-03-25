# frozen_string_literal: true

require 'test_helper'

class TeacherDecoratorTest < ActiveSupport::TestCase
  FULLNAME = 'フルネーム'
  NICKNAME = 'ニックネーム'
  FILE_NAME = 'enjoy-blockly.png'
  IMAGE_FILE = "files/#{FILE_NAME}"

  def setup
    @teacher = Teacher.new(
      fullname: FULLNAME,
      nickname: NICKNAME
    ).extend TeacherDecorator
  end

  test 'should return default icon_url when teacher didnt set' do
    expect = '/images/human.png'
    assert_equal expect, @teacher.icon_url
  end

  test 'should return teacher icon_url' do
    image = Pathname(file_fixture_path).join(FILE_NAME).open
    @teacher.icon.attach(io: image, filename: FILE_NAME, content_type: 'image/png')

    assert_match Regexp.new("#{FILE_NAME}$"), @teacher.icon_url
  end

  test 'should return nickname' do
    assert_equal NICKNAME, @teacher.nickname
  end

  test 'should return fullname text when nickname isnt set' do
    @teacher.nickname = nil
    assert_equal FULLNAME, @teacher.nickname
  end
end
