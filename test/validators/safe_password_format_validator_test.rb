# frozen_string_literal: true

require 'test_helper'

class MockModel
  include ActiveModel::Model

  attr_accessor :password

  validates :password, safe_password_format: true
end

class SafePasswordFormatValidatorTestSample < ActiveSupport::TestCase
  test 'should be valid because the password includes English characters and numbers' do
    mock = MockModel.new(password: 'Pa22w0rd')
    assert mock.valid?
  end

  test 'should be valid because the password includes English characters and symbols' do
    mock = MockModel.new(password: 'Pa$$w@rd')
    assert mock.valid?
  end

  test 'should be valid because the password includes numbers and symbols' do
    mock = MockModel.new(password: '1_3#5-7^')
    assert mock.valid?
  end

  test 'should be valid because the password includes English characters, numbers and symbols' do
    mock = MockModel.new(password: 'Pa$$w0rd')
    assert mock.valid?
  end

  test 'should be invalid because the password includes only English characters' do
    mock = MockModel.new(password: 'password')
    assert_not mock.valid?
  end

  test 'should be invalid because the password includes only numbers' do
    mock = MockModel.new(password: '12345678')
    assert_not mock.valid?
  end

  test 'should be invalid because the password includes only symbols' do
    mock = MockModel.new(password: "!\#$%&*?@")
    assert_not mock.valid?
  end

  test 'should be invalid because the password includes other than one-byte English characters, numbers, and symbols' do
    mock = MockModel.new(password: 'pa２２w0rd')
    assert_not mock.valid?

    mock = MockModel.new(password: 'p4すswおrd')
    assert_not mock.valid?

    mock = MockModel.new(password: 'pa＄＄w0rd')
    assert_not mock.valid?

    mock = MockModel.new(password: 'paｽｽw0rﾄﾞ')
    assert_not mock.valid?

    mock = MockModel.new(password: 'pａsｓw0rＤ')
    assert_not mock.valid?
  end
end
