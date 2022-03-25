# frozen_string_literal: true

class AddUniqueIndexOfKeywords < ActiveRecord::Migration[6.0]
  def change
    add_index :keywords, [:content, :student_id], unique: true
  end
end
