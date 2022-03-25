# frozen_string_literal: true

if Rails.env.development?
  teacher = Teacher.new(
    fullname: '先生1',
    email: 'dev@example.com',
    password: 'passw0rd'
  )
  teacher.save
  teacher.confirm_email

  class_room = ClassRoom.create(
    school_year: 2020,
    name: '１年３組',
    teacher: teacher
  )

  message_board_lesson = MessageBoard.create(
    class_room: class_room,
    kind: :lesson
  )
  message_board_performance = MessageBoard.create(
    class_room: class_room,
    kind: :performance
  )

  student = Student.new(
    number: 1,
    class_room: class_room,
    nickname: '生徒1',
    icon: :avatar1
  )
  student.new_tokens
  student.set_password('passw0rd')
  student.set_profile!

  1.upto(41) do |num|
    message_lesson = Message.new(
      body: "#{num} メッセージ",
      sender: student,
      message_board: message_board_lesson,
      image: nil,
      created_at: 1.hour.ago + num.second
    )
    message_lesson.save

    message_performance = Message.new(
      body: "#{num} メッセージ",
      sender: student,
      message_board: message_board_performance,
      image: nil,
      created_at: 1.hour.ago + num.second
    )
    message_performance.save
  end
end
