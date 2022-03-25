# frozen_string_literal: true

require 'application_system_test_case'

class StudentsTest < ApplicationSystemTestCase
  setup do
    @student = students(:profiled)
    @class_room_id = @student.class_room_id
    sensei_sign_in_as(ClassRoom.find(@class_room_id).teacher)
  end

  test 'visiting the index' do
    visit sensei_class_rooms_url
    click_on '生徒一覧を見る', match: :first
    assert_selector 'h2', text: '生徒一覧'
  end

  test 'creating a Student' do
    visit sensei_class_room_students_url(@class_room_id)
    click_on '生徒を登録する'

    fill_in '出席番号', with: Student.maximum(:number) + 1
    click_on '登録する'

    assert_text '生徒が登録されました'
    assert_selector 'h2', text: '生徒一覧'
  end

  test 'updating a Student' do
    visit sensei_class_room_students_url(@class_room_id)
    page.first('.bi-pencil-fill').click

    fill_in '出席番号', with: Student.maximum(:number) + 1
    click_on '登録する'

    assert_text '生徒情報を更新しました'
    assert_selector 'h2', text: '生徒一覧'
  end

  test 'destroying a Student' do
    visit sensei_class_room_students_url(@class_room_id)
    page.accept_confirm do
      page.first('.bi-trash-fill').click
    end

    assert_text '生徒情報が削除されました'
    assert_selector 'h2', text: '生徒一覧'
  end
end
