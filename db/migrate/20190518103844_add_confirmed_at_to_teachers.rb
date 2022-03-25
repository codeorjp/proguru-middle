# frozen_string_literal: true

class AddConfirmedAtToTeachers < ActiveRecord::Migration[5.2]
  def change
    change_table :teachers, bulk: true do |t|
      t.string :email_confirmation_token, null: false, default: ''
      t.datetime :email_confirmed_at
    end
  end
end
