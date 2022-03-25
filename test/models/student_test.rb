# frozen_string_literal: true

require 'test_helper'
require 'aasm/minitest'

class StudentTest < ActiveSupport::TestCase
  test 'unique by number & class_room_id pair' do
    student = Student.first
    new_student = Student.new(number: student.number, class_room_id: student.class_room_id)
    assert_not new_student.valid?
  end

  test 'number should be greater than 0' do
    student = Student.first
    negative_number = -1
    student.number = negative_number
    assert_not student.valid?
    nought = 0
    student.number = nought
    assert_not student.valid?
    positive_number = 1
    student.number = positive_number
    assert student.valid?
  end

  test '#new_tokens' do
    student = Student.new
    assert_nil student.initial_token
    assert_nil student.remember_token

    student.new_tokens

    assert_not_nil student.initial_token
    assert_not_nil student.remember_token
    assert student.initial_token.size == 8
    assert student.initial_token.starts_with?(/[a-z]/)
  end

  test '.find_with_token success' do
    student = students(:created)
    actual = Student.find_with_token(
      student.class_room_id,
      student.number,
      student.initial_token
    )

    assert actual.instance_of? Student
  end

  test '.find_with_token nil when student didnt find' do
    student = students(:created)
    actual = Student.find_with_token(
      student.class_room_id,
      student.number,
      'miss_typed_token'
    )
    assert_nil actual
  end

  test '.find_by_class_and_number success' do
    student = students(:profiled)
    actual = Student.find_by_class_and_number(
      student.class_room_id,
      student.number
    )

    assert actual.instance_of? Student
  end

  test '.find_by_class_and_number nil because student is going to found by other class_room_id' do
    student = students(:profiled)
    student.class_room_id = -1

    actual = Student.find_by_class_and_number(
      student.class_room_id,
      student.number
    )

    assert_nil actual
  end

  test '.find_by_class_and_number nil  because student is going to found by other number' do
    student = students(:profiled)
    student.number = -1

    actual = Student.find_by_class_and_number(
      student.class_room_id,
      student.number
    )

    assert_nil actual
  end

  test '#set_profile? is true' do
    student = students(:profiled)
    assert student.set_profile?
  end

  test '#set_profile is false when nickname & icon are nil' do
    student = students(:passworded)
    assert_not student.set_profile?
  end

  test '#sign_in_failed increments failed_attempts' do
    student = students(:profiled)

    assert_changes('student.failed_attempts', from: 0, to: 1) do
      student.sign_in_failed
    end
  end

  test '#sign_in_failed does not increment failed_attempts because the student status is not profiled or passworded' do
    [:created, :account_locked].each do |status|
      student = students(status)

      assert_no_changes('student.failed_attempts') do
        student.sign_in_failed
      end
    end
  end

  test "#sign_in_failed FAILED_ATTEMPTS_LIMIT times locks student's account" do
    student = students(:profiled)

    assert_changes('student.failed_attempts', from: 0, to: Student::FAILED_ATTEMPTS_LIMIT - 1) do
      (Student::FAILED_ATTEMPTS_LIMIT - 1).times do
        student.sign_in_failed
      end
    end

    assert_have_state student, :profiled

    assert_changes('student.failed_attempts', from: Student::FAILED_ATTEMPTS_LIMIT - 1, to: Student::FAILED_ATTEMPTS_LIMIT) do
      student.sign_in_failed
    end

    assert_have_state student, :account_locked
  end

  test '#reset_failed_attempts set failed_attempts to 0' do
    student = students(:account_locked)

    assert_changes('student.failed_attempts', from: Student::FAILED_ATTEMPTS_LIMIT, to: 0) do
      student.reset_failed_attempts
    end
  end

  test '#account_unlocked is true' do
    student = students(:profiled)
    assert student.account_unlocked?
  end

  test '#account_unlocked is false when the student has account_locked status' do
    student = students(:account_locked)
    assert_not student.account_unlocked?
  end

  test '#unlocked_and_authenticated success with password' do
    student = students(:profiled)
    assert student.unlocked_and_authenticated?('passw0rd')
  end

  test '#unlocked_and_authenticated fail with wrong password' do
    student = students(:profiled)
    assert_not student.unlocked_and_authenticated?('wrong_password')
  end

  test '#unlocked_and_authenticated fail because the student has account_locked status' do
    student = students(:account_locked)
    assert_not student.unlocked_and_authenticated?('passw0rd')
  end

  test '.token_authenticate success with initail_token' do
    student = students(:created)
    actual = Student.token_authenticate(
      student.class_room_id,
      student.number,
      student.initial_token
    )

    assert actual.instance_of? Student
  end

  test '.token_authenticate fail when inital_token are nil' do
    student = students(:created)
    actual = Student.token_authenticate(
      student.class_room_id,
      student.number,
      nil
    )

    assert_nil actual
  end

  test '.token_authenticate success when student is created' do
    student = students(:created)
    actual = Student.token_authenticate(
      student.class_room_id,
      student.number,
      student.initial_token
    )

    assert actual.instance_of? Student
  end

  # Sign-up state test
  test 'should state is created when student is a new instance' do
    student = Student.new
    assert_have_state student, :created
  end

  test 'should state is passworded when student set password' do
    student = students(:created)
    student.set_password('passw0rd')
    assert_have_state student, :passworded
    assert_not_nil student.initialized_at
  end

  test 'should state is profiled when student set profile & set password' do
    student = students(:created)
    student.nickname = '生徒1'
    student.icon = :avatar1
    student.set_password('passw0rd')
    assert_have_state student, :profiled
    assert_not_nil student.initialized_at
  end

  test 'should raise when set_password is called without new password' do
    student = students(:created)
    assert_raise AASM::InvalidTransition do
      student.set_password
    end
    assert_have_state student, :created
    assert_nil student.initialized_at
  end

  test 'should raise when password is short' do
    student = students(:created)
    assert_raise AASM::InvalidTransition do
      student.set_password('pass')
    end
    assert_have_state student, :created
    assert_nil student.initialized_at
    assert_not student.errors.empty?
  end

  test 'should raise when password includes only one type character' do
    student = students(:created)
    assert_raise AASM::InvalidTransition do
      student.set_password('password')
    end
    assert_have_state student, :created
    assert_nil student.initialized_at
    assert_not student.errors.empty?
  end

  test 'should raise when password includes other than one-byte English characters, numbers, and symbols' do
    student = students(:created)
    assert_raise AASM::InvalidTransition do
      student.set_password('p阿＄ｽw0ーＤ')
    end
    assert_have_state student, :created
    assert_nil student.initialized_at
    assert_not student.errors.empty?
  end

  test 'should state is profiled when student set profile' do
    student = students(:passworded)
    student.nickname = '生徒1'
    student.icon = :avatar1
    assert_transitions_from student, :passworded, to: :profiled, on_event: :set_profile
    assert_transitions_from student, :profiled, to: :profiled, on_event: :set_profile
  end

  test 'should raise when student nickname or icon are blank' do
    student = students(:passworded)
    assert_raise AASM::InvalidTransition do
      student.set_profile
    end
  end

  test 'should reset to created status' do
    [:passworded, :profiled, :account_locked].each do |status|
      student = students(status)
      initial_token = student.initial_token
      remember_token = student.remember_token

      assert_transitions_from student, status, to: :created, on_event: :reset
      assert_nil student.initialized_at
      assert_nil student.password
      assert_not_equal initial_token, student.initial_token
      assert_not_equal remember_token, student.remember_token
    end
  end

  test 'should state is account_locked when lock_account_event happens' do
    [:passworded, :profiled].each do |status|
      student = students(status)
      assert_transitions_from student, status, to: :account_locked, on_event: :lock_account
    end
  end

  test 'should state is profiled when account_locked student set failed_attempts to 0' do
    student = students(:account_locked)
    assert_changes('student.failed_attempts', from: Student::FAILED_ATTEMPTS_LIMIT, to: 0) do
      assert_transitions_from student, :account_locked, to: :profiled, on_event: :unlock_account
    end
  end

  test 'should state is passworded when account_locked & not set_profile student set failed_attempts to 0' do
    student = students(:account_locked)
    student.nickname = nil
    student.icon = nil
    assert_changes('student.failed_attempts', from: Student::FAILED_ATTEMPTS_LIMIT, to: 0) do
      assert_transitions_from student, :account_locked, to: :passworded, on_event: :unlock_account
    end
  end
end
