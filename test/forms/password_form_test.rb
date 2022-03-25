# frozen_string_literal: true

require 'test_helper'

class PasswordFormTest < ActiveSupport::TestCase
  setup do
    @password = 'passw0rd'
    @confirm  = 'passw0rd'
  end

  def params
    {
      password: @password,
      password_confirmation: @confirm
    }
  end

  test 'should be valid' do
    form = PasswordForm.new(params)
    assert form.valid?
  end

  test 'should be invalid by password is nil' do
    @password = nil
    form = PasswordForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, 'パスワードを入力してください'
  end

  test 'should be invalid by password_confirm is nil' do
    @confirm = nil
    form = PasswordForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, 'パスワード（確認用）を入力してください'
  end

  test 'should be invalid by password is too short' do
    @password = 'sh0rt'
    @confirm  = 'sh0rt'
    form = PasswordForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, 'パスワードは8文字以上で入力してください'
  end

  test 'should be invalid by password include only one type character' do
    @password = 'password'
    @confirm  = 'password'
    form = PasswordForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, 'パスワードは半角の英字・数字・記号の中から2種類以上を組み合わせて入力してください'
  end

  test 'should be invalid by password includes other than one-byte English characters, numbers, and symbols' do
    @password = 'p阿＄ｽw0ーＤ'
    @confirm  = 'p阿＄ｽw0ーＤ'
    form = PasswordForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, 'パスワードは半角の英字・数字・記号以外の文字では入力できません'
  end

  test 'should be invalid by password & confirm are different' do
    @confirm = 'd1fferent'
    form = PasswordForm.new(params)
    assert_not form.valid?
    assert_includes form.errors.full_messages, 'パスワード（確認用）とパスワードの入力が一致しません'
  end
end
