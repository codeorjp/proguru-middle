# frozen_string_literal: true

class AddFullnameAndNicknameToTeacher < ActiveRecord::Migration[5.2]
  def change
    change_table :teachers, bulk: true do |t|
      t.string :fullname, null: false
      t.string :nickname
    end
  end
end
