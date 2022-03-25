# frozen_string_literal: true

class CreateMessageBoards < ActiveRecord::Migration[5.2]
  def change
    create_table :message_boards do |t|
      t.integer :kind, null: false
      t.references :class_room, foreign_key: true

      t.timestamps
    end
  end
end
