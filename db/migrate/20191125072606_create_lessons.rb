# frozen_string_literal: true

class CreateLessons < ActiveRecord::Migration[5.2]
  def change
    create_table :lessons do |t|
      t.integer :number, null: false
      t.string :title, null: false
      t.text :description

      t.timestamps
    end
  end
end
