# frozen_string_literal: true

class AddEmailDeliveryAllowedToTeachers < ActiveRecord::Migration[6.0]
  def change
    add_column :teachers, :email_delivery_allowed, :boolean, default: true, null: false
  end
end
