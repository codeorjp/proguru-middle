# frozen_string_literal: true

require 'test_helper'

class MessageFormTest < ActiveSupport::TestCase
  setup do
    @body = 'message'
    @kind = 'lesson'
    @sender = students(:profiled)
  end

  def params
    { body: @body, kind: @kind, sender: @sender }
  end

  test 'should be valid' do
    form = MessageForm.new(params)
    assert form.valid?
  end

  test 'should be invalid by body is nil' do
    @body = nil
    form = MessageForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, 'メッセージ本文を入力してください'
  end

  test 'should be invalid by kind is nil' do
    @kind = nil
    form = MessageForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, 'チャットの種別を入力してください'
  end

  test 'should be invalid by kind is includes MessageBoard enum keys' do
    @kind = 'not_included'
    form = MessageForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, 'チャットの種別は一覧にありません'
  end

  test 'should be invalid by sender is nil' do
    @sender = nil
    form = MessageForm.new(params)
    assert_not form.valid?
    assert_not_nil form.errors
    assert_includes form.errors.full_messages, '送信者を入力してください'
  end
end
