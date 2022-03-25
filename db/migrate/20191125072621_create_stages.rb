# frozen_string_literal: true

class CreateStages < ActiveRecord::Migration[5.2]
  def change
    create_table :stages do |t|
      t.integer :number, null: false
      t.references :lesson, foreign_key: true
      t.bigint :next_id

      t.timestamps
    end
  end
end
