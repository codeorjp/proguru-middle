# frozen_string_literal: true

require 'application_system_test_case'

class ClassRoomsTest < ApplicationSystemTestCase
  setup do
    @class_room = class_rooms(:one)
    sensei_sign_in_as(@class_room.teacher)
  end

  test 'visiting the index' do
    visit sensei_class_rooms_url
  end

  test 'creating a Class room' do
    visit sensei_class_rooms_url
    click_on 'クラスを登録する', match: :first

    fill_in 'クラス名', with: @class_room.name
    fill_in '年度', with: @class_room.school_year
    fill_in 'クラス人数', with: 1
    click_on '登録する'

    assert_text 'クラスが作成されました'
  end

  test 'updating a Class room' do
    visit sensei_class_rooms_url
    click_on '編集', match: :first

    fill_in 'クラス名', with: @class_room.name
    fill_in '年度', with: @class_room.school_year
    click_on '登録する'

    assert_text 'クラス情報を更新しました'
  end

  test 'destroying a Class room' do
    visit sensei_class_rooms_url
    page.accept_confirm do
      click_on '削除', match: :first
    end

    assert_text 'クラスが削除されました'
    assert_selector '.first-user__title', text: 'はじめて授業を開始される方へ'
  end
end
