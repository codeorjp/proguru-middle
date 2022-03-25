# frozen_string_literal: true

require 'test_helper'

class Sensei::MessageBoardsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @class_room = class_rooms(:one)
    @message_boards = @class_room.message_boards
    @performance_board = @message_boards.performance.last
    @lesson_board = @message_boards.lesson.last
    @teacher = @class_room.teacher
  end

  test 'should get show with performances messages' do
    sensei_sign_in_as(@teacher)
    get sensei_message_board_path(@performance_board)
    assert_response :success
    assert_select 'h3', text: /^チャット/, count: 1
  end

  test 'should get show with lesson messages' do
    sensei_sign_in_as(@teacher)
    get sensei_message_board_path(@lesson_board)
    assert_response :success
    assert_select 'h3', text: /^レッスン/, count: 1
  end

  test 'shoud not get show by other teacher' do
    other_class = class_rooms(:another)
    sensei_sign_in_as(@teacher)
    other_board = other_class.message_boards.lesson.last
    get sensei_message_board_path(other_board)

    assert_redirected_to sensei_class_rooms_path
  end
end
