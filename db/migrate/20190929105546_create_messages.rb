# frozen_string_literal: true

class CreateMessages < ActiveRecord::Migration[5.2]
  def change
    create_table :messages do |t|
      t.string :body, null: false
      t.references :message_board, foreign_key: true
      t.references :sender, polymorphic: true, null: false

      t.timestamps
    end
  end
end
