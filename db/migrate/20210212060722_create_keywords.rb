# frozen_string_literal: true

class CreateKeywords < ActiveRecord::Migration[6.0]
  def change
    create_table :keywords do |t|
      t.string :content, null: false
      t.references :student, null: false, foreign_key: true

      t.timestamps
    end
  end
end
