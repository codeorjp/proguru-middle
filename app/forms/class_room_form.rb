# frozen_string_literal: true

class ClassRoomForm
  include ActiveModel::Model
  include ActiveModel::Attributes

  attribute :students_count, :integer
  attr_accessor :school_year, :name, :teacher_id

  delegate :new_record?, to: :@class_room

  validates :school_year, :name, presence: true
  # school_year will be sorted key, so it makes to strict format YYYY not but YY
  validates :school_year, numericality: { only_integer: true, greater_than: 2000 }
  validates :students_count, numericality: { only_integer: true, greater_than: 0, less_than_or_equal_to: 50 }

  def class_room
    @class_room ||= ClassRoom.new(
      school_year: school_year,
      name: name,
      teacher_id: teacher_id
    )
  end

  def save
    return false if invalid?

    ActiveRecord::Base.transaction do
      class_room.save!
      MessageBoard.create!(class_room: class_room, kind: :lesson)
      MessageBoard.create!(class_room: class_room, kind: :performance)

      students = (1..students_count).map do |number|
        student = Student.new(number: number, class_room: class_room)
        student.new_tokens
        student
      end
      Student.import! students
    end
    true
  rescue ActiveRecord::RecordInvalid => e
    errors.merge!(e.record.errors)
    false
  end
end
