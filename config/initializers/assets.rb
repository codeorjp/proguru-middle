# frozen_string_literal: true

# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.0'

# Add additional assets to the asset load path.
# Rails.application.config.assets.paths << Emoji.images_path
# Add Yarn node_modules folder to the asset load path.
Rails.application.config.assets.paths << Rails.root.join('node_modules')
Rails.application.config.assets.paths << Rails.root.join('app/assets/fonts')

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in the app/assets
# folder are already added.
# Rails.application.config.assets.precompile += %w( admin.js admin.css )
Rails.application.config.assets.precompile += %w[
  .svg .eot .woff .ttf
  sensei/class_rooms.css
  sensei/students.css
  sensei/email_confirmations.css
  sensei/sessions.css
  sensei/sensei.css
  sensei/teachers.css
  sensei/workspaces.css
  sensei/messages.css
  sensei/message_boards.css
  sensei/terms.css
  sensei/student_prints.css
  sensei/passwords.css
  sensei/change_passwords.css
  sensei/emails.css
  sensei/stages.css
  sensei/keywords.css
]
