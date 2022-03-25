# frozen_string_literal: true

require 'test_helper'

class StudentProfileFormTest < ActiveSupport::TestCase
  setup do
    @nickname = '生徒1'
    @icon = 'avatar1'
    @student = students(:passworded)
  end

  def params
    { nickname: @nickname, icon: @icon, student: @student }
  end

  test 'should be valid' do
    form = StudentProfileForm.new(params)
    assert form.valid?
  end

  test 'should be invalid by nickname is nil' do
    @nickname = nil
    form = StudentProfileForm.new(params)
    assert_not form.valid?
    assert_includes form.errors.full_messages, 'ニックネームを入力してください'
  end

  test 'should be invalid by nickname is 1 charactor' do
    @nickname = 'あ'
    form = StudentProfileForm.new(params)
    assert_not form.valid?
    assert_includes form.errors.full_messages, 'ニックネームは2文字以上で入力してください'
  end

  test 'should be invalid by nickname is over 9 charactors' do
    @nickname = 'あああああああああ'
    form = StudentProfileForm.new(params)
    assert_not form.valid?
    assert_includes form.errors.full_messages, 'ニックネームは8文字以内で入力してください'
  end

  test 'should be invalid by icon is nil' do
    @icon = nil
    form = StudentProfileForm.new(params)
    assert_not form.valid?
    assert_includes form.errors.full_messages, 'アイコンを入力してください'
  end
end
