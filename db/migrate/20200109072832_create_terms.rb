# frozen_string_literal: true

class CreateTerms < ActiveRecord::Migration[6.0]
  def change
    create_table :terms do |t|
      t.text :content, null: false
      t.references :class_room, foreign_key: true

      t.timestamps
    end
  end
end
