# frozen_string_literal: true

class AddUniqueIndexOfWorkspaces < ActiveRecord::Migration[6.0]
  def change
    add_index :workspaces, [:student_id, :stage_id], unique: true
  end
end
