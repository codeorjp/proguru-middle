# frozen_string_literal: true

module Api::Sensei::MessageHelper
  def jpeg_attached?(message)
    message.image.attached? \
    && message.image.blob.content_type == 'image/jpeg' \
    && message.image.blob.byte_size.nonzero?
  end
end
