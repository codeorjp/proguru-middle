# frozen_string_literal: true

require 'test_helper'

class SayHelloFormTest < ActiveSupport::TestCase
  setup do
    @body = 'おはよう'
    @kind = 'lesson'
    @sender = students(:profiled)
    @hour = '11'
  end

  def params
    { body: @body, kind: @kind, sender: @sender, hour: @hour }
  end

  test 'should be valid' do
    form = SayHelloForm.new(params)
    assert form.valid?
  end

  test 'should be invalid by body is nil' do
    @body = nil
    form = SayHelloForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, 'メッセージ本文を入力してください'
  end

  test 'should be invalid by kind is nil' do
    @kind = nil
    form = SayHelloForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, 'チャットの種別を入力してください'
  end

  test 'should be invalid by kind is includes MessageBoard enum keys' do
    @kind = 'not_included'
    form = SayHelloForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, 'チャットの種別は一覧にありません'
  end

  test 'should be invalid by sender is nil' do
    @sender = nil
    form = SayHelloForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, '送信者を入力してください'
  end

  test 'should be invalid by hour is nil' do
    @hour = nil
    form = SayHelloForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, '時間を入力してください'
  end

  test 'should be invalid by hour is not integer' do
    @hour = '十二時'
    form = SayHelloForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, '時間は数値で入力してください'
  end
end
