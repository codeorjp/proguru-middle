# frozen_string_literal: true

class AddRememberTokenToStudent < ActiveRecord::Migration[5.2]
  def change
    change_table :students, bulk: true do |t|
      t.string :remember_token, limit: 128, null: false
      t.index :remember_token
    end
  end
end
