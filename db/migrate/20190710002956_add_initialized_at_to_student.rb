# frozen_string_literal: true

class AddInitializedAtToStudent < ActiveRecord::Migration[5.2]
  def change
    add_column :students, :initialized_at, :datetime
  end
end
