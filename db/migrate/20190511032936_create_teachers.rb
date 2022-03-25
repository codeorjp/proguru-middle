# frozen_string_literal: true

class CreateTeachers < ActiveRecord::Migration[5.2]
  def change
    create_table :teachers do |t|
      t.timestamps null: false
      t.string :email, null: false
      t.string :encrypted_password, limit: 128, null: false
      t.string :confirmation_token, limit: 128
      t.string :remember_token, limit: 128, null: false
    end

    change_table :teachers, bulk: true do |t|
      t.index :email, unique: true
      t.index :remember_token
    end
  end
end
