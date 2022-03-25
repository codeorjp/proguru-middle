# frozen_string_literal: true

class AddFailedAttemptsToStudents < ActiveRecord::Migration[6.0]
  def change
    add_column :students, :failed_attempts, :integer, default: 0, null: false
  end
end
