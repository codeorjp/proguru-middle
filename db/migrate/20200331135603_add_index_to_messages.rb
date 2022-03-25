# frozen_string_literal: true

class AddIndexToMessages < ActiveRecord::Migration[6.0]
  def change
    add_index :messages, [:sender_id, :created_at]
  end
end
