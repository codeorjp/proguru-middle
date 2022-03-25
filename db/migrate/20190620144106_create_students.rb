# frozen_string_literal: true

class CreateStudents < ActiveRecord::Migration[5.2]
  def change
    create_table :students do |t|
      t.integer :number, null: false
      t.references :class_room, foreign_key: true
      t.string :encrypted_password, limit: 128
      t.string :initial_token, limit: 128

      t.timestamps
    end

    change_table :students, bulk: true do |t|
      t.index [:class_room_id, :number], unique: true
      t.index :initial_token
    end
  end
end
