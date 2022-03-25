# frozen_string_literal: true

class Student < ApplicationRecord
  include Clearance::User
  include Clearance::EmailOptionable
  include Iconable
  include AASM

  INITIAL_TOKEN_SIZE = 7
  LOWERCASE_ALPHABETS_RANGE = ('a'..'z').freeze
  FAILED_ATTEMPTS_LIMIT = 10

  belongs_to :class_room
  has_many :messages, as: :sender, dependent: :destroy
  has_many :workspaces, dependent: :destroy
  has_many :keywords, dependent: :destroy

  validates :number, presence: true
  validates :number, uniqueness: { scope: :class_room_id }
  validates :number, numericality: { only_integer: true, greater_than: 0 }

  validates :password,
            length: { minimum: 8 },
            safe_password_format: true,
            allow_blank: true

  enum icon: ICONS

  aasm column: :status do
    state :created, initial: true
    state :passworded, :profiled, :account_locked

    event :set_password do
      before { |password| self.password = password }
      transitions from: :created, to: :passworded, guard: -> { password.present? }, if: -> { valid? && !set_profile? }
      transitions from: :created, to: :profiled, guard: -> { password.present? }, if: -> { valid? && set_profile? }
      after { self.initialized_at = Time.current }
    end

    event :set_profile do
      transitions from: [:passworded, :profiled], to: :profiled, guard: -> { set_profile? }
    end

    event :reset do
      before do
        self.initialized_at = nil
        self.password = nil
        new_tokens
      end
      transitions from: [:passworded, :profiled, :account_locked], to: :created
    end

    event :lock_account do
      transitions from: [:passworded, :profiled], to: :account_locked
    end

    event :unlock_account do
      before do
        reset_failed_attempts
      end
      transitions from: :account_locked, to: :passworded, if: -> { !set_profile? }
      transitions from: :account_locked, to: :profiled, if: -> { set_profile? }
    end
  end

  def new_remember_token
    self.remember_token = Clearance::Token.new
  end

  def new_tokens
    # This initial_token default size is 40.
    # But student will type this token string one of each by keyboard.
    # So, the token should not be too long for UX, and not to too short for security.
    # And, the token starts with an alphabetical characters to prevent exponential notation in spreadsheet software.
    self.initial_token = one_random_char + Clearance::Token.new[0...INITIAL_TOKEN_SIZE]
    new_remember_token
  end

  def set_profile?
    nickname.present? && icon.present?
  end

  def sign_in_failed
    # To prevent unauthorized access, it makes possible to lock also passworded student accounts.
    return unless profiled? || passworded?

    self.failed_attempts += 1
    lock_account if failed_attempts == FAILED_ATTEMPTS_LIMIT
    save
  end

  def reset_failed_attempts
    self.failed_attempts = 0
  end

  def account_unlocked?
    !account_locked?
  end

  def unlocked_and_authenticated?(password)
    account_unlocked? && authenticated?(password)
  end

  def self.find_with_token(class_room_id, number, initial_token)
    find_by(
      class_room_id: class_room_id,
      number: number,
      initial_token: initial_token
    )
  end

  def self.find_own_class(student_id, teacher_id)
    Student.joins(:class_room)
           .find_by!(id: student_id, 'class_rooms.teacher_id': teacher_id)
  end

  def self.find_by_class_and_number(class_room_id, number)
    return nil if class_room_id.nil? || number.nil?

    find_by(class_room_id: class_room_id, number: number)
  end

  def self.token_authenticate(class_room_id, number, initial_token)
    return nil if initial_token.nil?

    find_with_token(class_room_id, number, initial_token)
  end

  private

    def password_optional?
      true
    end

    def one_random_char
      total_chars_count = LOWERCASE_ALPHABETS_RANGE.count
      random_index = rand(total_chars_count)
      LOWERCASE_ALPHABETS_RANGE.to_a[random_index]
    end
end
