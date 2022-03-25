# frozen_string_literal: true

module ApplicationHelper
  # To use helper in jbuilder ( api/sensei/messages/index.json.jbuilder )
  # ref: https://github.com/rails/jbuilder/issues/227#issuecomment-157200424
  include Api::Sensei::MessageHelper
end
