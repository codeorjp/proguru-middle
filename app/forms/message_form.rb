# frozen_string_literal: true

class MessageForm
  include ActiveModel::Model

  attr_accessor :body, :kind, :sender, :image

  validates :body, presence: true, length: { maximum: 255 }, if: -> { image.blank? }
  validates :kind, presence: true
  validates :kind, inclusion: { in: MessageBoard.kinds.keys }
  validates :sender, presence: true
  validates :image, presence: true, if: -> { body.blank? }

  def to_model
    Message.new(
      body: body,
      sender: sender,
      message_board: message_board,
      image: image
    )
  end

  def save
    return false if invalid?

    message = to_model
    message.save
    message
  end

  private

    # MessageBoard should be found
    #   when sender is passed with required_student_login
    #   and kind is included in enum of MessageBoard.kind
    def message_board
      @message_board ||= MessageBoard.find_by(
        class_room: sender&.class_room,
        kind: kind
      )
    end
end
