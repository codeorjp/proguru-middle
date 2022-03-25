# frozen_string_literal: true

json.messages @messages do |message|
  json.id message.id
  json.nickname message.sender.nickname
  json.sender_number message.sender.number
  json.body message.body
  json.image_url url_for(message.image) if jpeg_attached?(message)
  json.sent_at message.sent_at
end

json.messages_count @messages.count
