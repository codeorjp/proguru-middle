# frozen_string_literal: true

class Message < ApplicationRecord
  self.per_page = 50

  belongs_to :message_board
  belongs_to :sender, polymorphic: true

  has_one_attached :image

  validate :check_message_count

  scope :board, lambda { |class_room_id, kind|
    joins(:message_board)
      .where(
        message_boards: {
          class_room_id: class_room_id,
          kind: kind
        }
      )
  }
  scope :after, ->(id) { id.blank? ? nil : where('messages.id > ?', id) }
  scope :before, ->(id) { id.blank? ? nil : where('messages.id < ?', id) }

  def sent_at
    created_at.to_i
  end

  def check_message_count
    to   = Time.current
    from = to - 1.second
    return if message_board.messages.where(sender_id: sender.id, created_at: from..to).count < 100

    errors.add(:message_board, 'に一定時間内に送れるメッセージ数を超過しました。')
  end
end
