# frozen_string_literal: true

class SafePasswordFormatValidator < ActiveModel::EachValidator
  SYMBOL = '!"#$%&\'\(\)\*\-\.\/:;<>\?@\[\]\^_`\{\|\}~'

  ALLOW_LETTERS = /\A[a-zA-Z\d#{SYMBOL}]+\z/.freeze
  CHAR_TYPES = [/[a-zA-Z]/, /\d/, /[#{SYMBOL}]/].freeze

  FAILD_SYMBOLS = {
    letters: :failed_safe_password_format_validation_invalid_letters,
    combination: :failed_safe_password_format_validation_insufficient_combination
  }.freeze

  def validate_each(record, attr, value)
    return if value.nil?

    record.errors.add(attr, FAILD_SYMBOLS[:letters]) unless valid_letters?(value)
    record.errors.add(attr, FAILD_SYMBOLS[:combination]) unless valid_combination?(value)
  end

  private

    def valid_letters?(value)
      value.match?(ALLOW_LETTERS)
    end

    def valid_combination?(value)
      CHAR_TYPES.count { |r| value.match?(r) } >= 2
    end
end
