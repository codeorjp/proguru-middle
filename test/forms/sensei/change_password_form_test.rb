# frozen_string_literal: true

require 'test_helper'

class Sensei::ChangePasswordFormTest < ActiveSupport::TestCase
  setup do
    @current  = 'passw0rd'
    @password = 'passw0rd_new'
    @confirm  = 'passw0rd_new'
    @teacher  = teachers(:confirmed)
  end

  def params
    {
      current_password: @current,
      new_password: @password,
      new_password_confirmation: @confirm,
      teacher: @teacher
    }
  end

  test 'should be valid' do
    form = Sensei::ChangePasswordForm.new(params)
    assert form.valid?
  end

  test 'should be invalid by current_password is nil' do
    @current = nil
    form = Sensei::ChangePasswordForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, '現在のパスワードを入力してください'
  end

  test 'should be invalid by password is nil' do
    @password = nil
    form = Sensei::ChangePasswordForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, '新しいパスワードを入力してください'
  end

  test 'should be invalid by password_confirm is nil' do
    @confirm = nil
    form = Sensei::ChangePasswordForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, '新しいパスワード（確認用）を入力してください'
  end

  test 'should be invalid by password & confirm are different' do
    @confirm = 'd1fferent'
    form = Sensei::ChangePasswordForm.new(params)
    assert_not form.valid?
    assert_includes form.errors.full_messages, '新しいパスワード（確認用）と新しいパスワードの入力が一致しません'
  end

  test 'should be invalid by current_password is incorrect' do
    @current = 'inc0rrect'
    form = Sensei::ChangePasswordForm.new(params)
    assert_not form.valid?
    assert_includes form.errors.full_messages, '現在のパスワードが一致しません'
  end

  test 'should be invalid by password include only one type character' do
    @password = 'password'
    @confirm = 'password'
    form = Sensei::ChangePasswordForm.new(params)
    assert_not form.valid?
    assert_includes form.errors.full_messages, '新しいパスワードは半角の英字・数字・記号の中から2種類以上を組み合わせて入力してください'
  end

  test 'should be invalid by password includes other than one-byte English characters, numbers, and symbols' do
    @password = 'p阿＄ｽw0ーＤ'
    @confirm = 'p阿＄ｽw0ーＤ'
    form = Sensei::ChangePasswordForm.new(params)
    assert_not form.valid?
    assert_includes form.errors.full_messages, '新しいパスワードは半角の英字・数字・記号以外の文字では入力できません'
  end
end
