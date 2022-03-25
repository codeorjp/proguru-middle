# frozen_string_literal: true

class ChangeBodyColumnAllowNullToMessages < ActiveRecord::Migration[5.2]
  def change
    change_column :messages, :body, :string, null: true
  end
end
