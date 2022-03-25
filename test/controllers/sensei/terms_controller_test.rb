# frozen_string_literal: true

require 'test_helper'

class Sensei::TermsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @class_room = class_rooms(:one)
    @teacher = @class_room.teacher
  end

  test 'should get terms#show' do
    sensei_sign_in_as(@teacher)
    get sensei_class_room_terms_url(@class_room)
    assert_response :success
    assert_select 'div', text: '利用規約です。'
  end

  test 'should not get terms#show for other classroom' do
    other_class_room = class_rooms(:another)
    sensei_sign_in_as(@teacher)
    get sensei_class_room_terms_url(other_class_room)
    assert_redirected_to sensei_class_rooms_url
    assert_equal '対象のクラスが見つかりませんでした', flash[:error]
  end

  test 'should get terms#new' do
    sensei_sign_in_as(@teacher)
    get new_sensei_class_room_terms_url(@class_room)
    assert_response :success
  end

  test 'should display terms template terms#new' do
    sensei_sign_in_as(@teacher)
    get new_sensei_class_room_terms_url(@class_room)
    assert_select 'textarea', text: "チャットの利用にあたり、以下の行為をしてはいけません。\n\n1. 相手の嫌がる内容を投稿する行為\n\n2. 他の生徒になりすます行為\n\n\nどんな決まりを入れるとみんなが気持ちよく使えるか考えてみよう！\n考えたチャットの利用ルールを書き加えよう！"
  end

  test 'should not get terms#new for other classroom' do
    other_class_room = class_rooms(:another)
    sensei_sign_in_as(@teacher)
    get new_sensei_class_room_terms_url(other_class_room)
    assert_redirected_to sensei_class_rooms_url
    assert_equal '対象のクラスが見つかりませんでした', flash[:error]
  end

  test 'should create term' do
    class_room = ClassRoom.create(school_year: 2020, name: 'no_term', teacher: @teacher)
    sensei_sign_in_as(@teacher)
    assert_difference('Term.count', 1) do
      post sensei_class_room_terms_url(class_room), params: { term: { content: 'ここには利用規約が入力されます' } }
    end
    assert_equal 'ここには利用規約が入力されます', class_room.term.content
    assert_redirected_to sensei_class_rooms_url
  end

  test "should not create other classrooms' term" do
    other_class_room = class_rooms(:another)
    sensei_sign_in_as(@teacher)
    assert_no_difference('Term.count') do
      post sensei_class_room_terms_url(other_class_room), params: { term: { content: 'ここには利用規約が入力されます' } }
    end
    assert_redirected_to sensei_class_rooms_url
    assert_equal '対象のクラスが見つかりませんでした', flash[:error]
  end

  test 'should not create term because the term has already existed' do
    sensei_sign_in_as(@teacher)
    assert_no_difference('Term.count') do
      post sensei_class_room_terms_url(@class_room), params: { term: { content: 'ここには利用規約が入力されます' } }
    end
  end

  test 'should get terms#edit' do
    sensei_sign_in_as(@teacher)
    get edit_sensei_class_room_terms_url(@class_room)
    assert_response :success
  end

  test 'should not get terms#edit for other classroom' do
    other_class_room = class_rooms(:another)
    sensei_sign_in_as(@teacher)
    get edit_sensei_class_room_terms_url(other_class_room)
    assert_redirected_to sensei_class_rooms_url
    assert_equal '対象のクラスが見つかりませんでした', flash[:error]
  end

  test 'should update term' do
    sensei_sign_in_as(@teacher)
    assert_changes('Term.last.content') do
      put sensei_class_room_terms_url(@class_room), params: { term: { content: 'The term is entered here' } }
    end
    assert_redirected_to sensei_class_rooms_url
  end

  test "should not update other classrooms' term" do
    other_class_room = class_rooms(:another)
    sensei_sign_in_as(other_class_room.teacher)
    assert_no_changes('Term.last.content') do
      put sensei_class_room_terms_url(@class_room), params: { term: { content: 'The term is entered here' } }
    end
    assert_redirected_to sensei_class_rooms_url
    assert_equal '対象のクラスが見つかりませんでした', flash[:error]
  end

  test 'should redirect sign-in page' do
    get sensei_class_room_terms_url(@class_room)
    assert_redirected_to sensei_sign_in_path

    get new_sensei_class_room_terms_url(@class_room)
    assert_redirected_to sensei_sign_in_path

    post sensei_class_room_terms_url(@class_room), params: { term: { content: 'ここには利用規約が入力されます' } }
    assert_redirected_to sensei_sign_in_path

    get edit_sensei_class_room_terms_url(@class_room)
    assert_redirected_to sensei_sign_in_path

    put sensei_class_room_terms_url(@class_room), params: { term: { content: 'The term is entered here' } }
    assert_redirected_to sensei_sign_in_path
  end
end
