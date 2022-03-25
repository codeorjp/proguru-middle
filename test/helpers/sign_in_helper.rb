# frozen_string_literal: true

module SignInHelper
  def sensei_sign_in_as(teacher)
    post '/sensei/session',
         params: {
           session: {
             email: teacher.email,
             password: teacher.password || 'passw0rd'
           }
         }
  end

  def sign_in_as(student)
    post sessions_path,
         params: {
           student: {
             class_room_id: student.class_room_id,
             number: student.number,
             password: student.password || 'passw0rd'
           }
         }
  end
end
