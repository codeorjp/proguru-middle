# frozen_string_literal: true

class ChatRoomsController < Students::BaseController
  before_action :require_student_login

  def index
    lesson = Lesson.find_by!(number: 5)
    design_stage = lesson.first_stage
    blockly_stage = Stage.find(design_stage.next_id)
    @design = Workspace.for_restore_find_uniq_by(current_student, design_stage)
    @block = Workspace.for_restore_find_uniq_by(current_student, blockly_stage)
  end
end
