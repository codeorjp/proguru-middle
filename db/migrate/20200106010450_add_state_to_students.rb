# frozen_string_literal: true

class AddStateToStudents < ActiveRecord::Migration[6.0]
  def change
    add_column :students, :status, :string, null: false
  end
end
