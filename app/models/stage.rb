# frozen_string_literal: true

class Stage < ApplicationRecord
  belongs_to :lesson
  has_many :workspaces
end
