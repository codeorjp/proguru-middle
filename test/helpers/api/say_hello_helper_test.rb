# frozen_string_literal: true

require 'test_helper'

class Api::SayHelloHelperTest < ActionView::TestCase
  test 'should reply おはよう' do
    assert_equal 'おはよう！', reply('おはよう', '11')
  end

  test 'should reply おはようの時間だよ！' do
    assert_equal 'おはようの時間だよ！', reply('こんにちは', '11')
  end

  test 'should reply こんにちは' do
    assert_equal 'こんにちは！', reply('こんにちは', '12')
  end

  test 'should reply こんにちはの時間だよ！' do
    assert_equal 'こんにちはの時間だよ！', reply('おはよう', '12')
  end

  test 'should reply サーバで "おは" を受け取りました！' do
    assert_equal %(サーバで "おは" を受け取りました！), reply('おは', '11')
    assert_equal %(サーバで "おは" を受け取りました！), reply('おは', '12')
  end
end
