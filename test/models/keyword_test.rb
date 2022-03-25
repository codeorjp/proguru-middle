# frozen_string_literal: true

require 'test_helper'

class KeywordTest < ActiveSupport::TestCase
  setup do
    @student = students(:profiled)
  end

  test 'valid keyword' do
    keyword = Keyword.new(content: 'キーワード', student: @student)
    assert keyword.valid?
  end

  test 'invalid keyword without content' do
    keyword = Keyword.new(student: @student)
    assert_not keyword.valid?
    assert keyword.errors[:content].present?
  end

  test 'invalid keyword without student' do
    keyword = Keyword.new(content: 'キーワード')
    assert_not keyword.valid?
    assert keyword.errors[:student].present?
  end

  test 'invalid keyword because the content is not unique of the student' do
    already_exists_keyword = keywords(:one)
    assert_equal already_exists_keyword.student, @student
    keyword = Keyword.new(content: already_exists_keyword.content, student: @student)
    assert_not keyword.valid?
    assert keyword.errors[:content].present?
  end

  test 'invalid keyword over MAX_KEYWORDS_COUNT' do
    (Keyword::MAX_KEYWORDS_COUNT - Keyword.owner(@student).count).times do |n|
      Keyword.create(content: n, student: @student)
    end

    keyword = Keyword.new(content: 'キーワード', student: @student)
    assert_not keyword.valid?
    assert keyword.errors[:content].present?
  end
end
