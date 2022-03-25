# frozen_string_literal: true

class CreateWorkspaces < ActiveRecord::Migration[5.2]
  def change
    create_table :workspaces do |t|
      t.references :stage, foreign_key: true
      t.references :student, foreign_key: true
      t.text :body, limit: 16_777_215

      t.timestamps
    end
  end
end
