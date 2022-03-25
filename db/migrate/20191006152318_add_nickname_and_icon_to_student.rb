# frozen_string_literal: true

class AddNicknameAndIconToStudent < ActiveRecord::Migration[5.2]
  def change
    change_table :students, bulk: true do |t|
      t.string :nickname
      t.integer :icon
    end
  end
end
