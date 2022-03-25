# frozen_string_literal: true

class Workspace < ApplicationRecord
  belongs_to :student
  belongs_to :stage

  validates :stage, uniqueness: { scope: :student }
  validates :body, presence: true

  def self.id_each_stages(student)
    Workspace.where(student: student)
             .pluck(:stage_id, :id)
             .to_h
  end

  def self.for_restore_find_uniq_by(student, stage)
    select(:id, :body).find_by(student: student, stage: stage)
  end
end
