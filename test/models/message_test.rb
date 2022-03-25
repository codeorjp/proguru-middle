# frozen_string_literal: true

require 'test_helper'

class MessageTest < ActiveSupport::TestCase
  test 'should sent_at return int' do
    unixtime = 1_500_000_000
    message = Message.new
    message.created_at = Time.zone.at(unixtime)
    assert unixtime, message.sent_at
  end

  test 'should success 100 messages per second & fail with 101st message' do
    freeze_time

    student = students(:profiled)
    board = student.class_room.message_boards.first

    assert_difference('Message.count', 100) do
      100.times { Message.create!(body: 'sample', sender: student, message_board: board) }
    end

    message = Message.new(body: 'sample', sender: student, message_board: board)
    assert_not message.save
    assert_includes message.errors.full_messages, 'チャットに一定時間内に送れるメッセージ数を超過しました。'
  end
end
