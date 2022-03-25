# frozen_string_literal: true

class AddIndexOfEmailConfirmationTokenToTeacher < ActiveRecord::Migration[6.0]
  def change
    add_index :teachers, :email_confirmation_token
  end
end
