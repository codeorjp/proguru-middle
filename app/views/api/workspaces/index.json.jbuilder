# frozen_string_literal: true

json.workspace do
  if @workspace.present?
    json.id @workspace.id
    json.body @workspace.body
  else
    json.nil!
  end
end
