# frozen_string_literal: true

class SayHelloForm < MessageForm
  attr_accessor :hour

  validates :hour, presence: true
  validates :hour, numericality: { only_integer: true, lesser_than: 24 }
end
