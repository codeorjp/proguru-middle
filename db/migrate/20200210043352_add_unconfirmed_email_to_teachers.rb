# frozen_string_literal: true

class AddUnconfirmedEmailToTeachers < ActiveRecord::Migration[6.0]
  def change
    add_column :teachers, :unconfirmed_email, :string
  end
end
