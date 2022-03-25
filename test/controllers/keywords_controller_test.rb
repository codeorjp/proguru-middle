# frozen_string_literal: true

require 'test_helper'

class KeywordsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @student = students(:profiled)
    @keyword = keywords(:one)
  end

  test 'should get index' do
    sign_in_as(@student)
    get keywords_path
    assert_response :success
  end

  test 'should get new' do
    sign_in_as(@student)
    get new_keyword_path
    assert_response :success
  end

  test 'should create class_room and students' do
    sign_in_as(@student)
    assert_difference('Keyword.count', 1) do
      post keywords_path, params: { keyword: { content: 'キーワード' } }
    end

    assert_redirected_to new_keyword_url
    assert_equal 'キーワード', Keyword.last.content
    assert_equal @student, Keyword.last.student
  end

  test 'should not create because parameters are empty' do
    sign_in_as(@student)
    assert_no_difference('Keyword.count') do
      post keywords_path, params: { keyword: { content: '' } }
    end

    assert_select_error_explanation('キーワードを入力してください')
    assert_equal keywords_path, path
  end

  test 'should not create because the keyword content is not unique of the student' do
    sign_in_as(@student)
    assert_no_difference('Keyword.count') do
      post keywords_path, params: { keyword: { content: @keyword.content } }
    end

    assert_select_error_explanation('キーワードはすでに存在します')
    assert_equal keywords_path, path
  end

  test 'should not create because keywords count over MAX_KEYWORDS_COUNT' do
    sign_in_as(@student)
    (Keyword::MAX_KEYWORDS_COUNT - Keyword.owner(@student).count).times do |n|
      Keyword.create(content: n, student: @student)
    end

    assert_no_difference('Keyword.count') do
      post keywords_path, params: { keyword: { content: 'キーワード' } }
    end

    assert_select_error_explanation('キーワードを登録できるのは10個までです')
    assert_equal keywords_path, path
  end

  test 'should destroy keyword' do
    sign_in_as(@student)
    assert_difference('Keyword.count', -1) do
      delete keyword_path(@keyword)
    end

    assert_redirected_to keywords_url
  end

  test "should not destroy other teacher's class rooms" do
    sign_in_as(@student)
    other_keyword = keywords(:another)
    assert_no_difference('Keyword.count') do
      delete keyword_path(other_keyword)
    end

    assert_redirected_to keywords_path
    assert_equal '対象のキーワードが見つかりませんでした', flash[:error]
  end

  test 'should redirect before sign-in' do
    get keywords_path
    assert_redirected_to sign_in_url

    get new_keyword_url
    assert_redirected_to sign_in_url

    post keywords_path, params: { keyword: { content: 'キーワード' } }
    assert_redirected_to sign_in_url

    delete keyword_path(@keyword)
    assert_redirected_to sign_in_url
  end
end
