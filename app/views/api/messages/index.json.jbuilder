# frozen_string_literal: true

json.messages @messages do |message|
  json.id message.id
  json.sender_id message.sender_id
  json.sender_type message.sender_type
  json.nickname message.sender.nickname
  json.number message.sender.number
  json.icon_url image_path(message.sender.icon_url)
  json.body message.body
  json.image_url url_for(message.image) if message.image.attached?
  json.sent_at message.sent_at
end
