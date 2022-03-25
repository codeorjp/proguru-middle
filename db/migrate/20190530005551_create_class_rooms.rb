# frozen_string_literal: true

class CreateClassRooms < ActiveRecord::Migration[5.2]
  def change
    create_table :class_rooms do |t|
      t.integer :school_year, null: false
      t.string :name, null: false
      t.references :teacher, foreign_key: true

      t.timestamps
    end
  end
end
