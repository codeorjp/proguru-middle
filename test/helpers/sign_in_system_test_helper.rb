# frozen_string_literal: true

require 'rails/test_help'

class ActionDispatch::SystemTestCase
  module SignInSystemTestHelper
    def sensei_sign_in_as(teacher)
      visit sensei_sign_in_path
      fill_in 'メールアドレス', with: teacher.email
      fill_in 'パスワード', with: teacher.password || 'passw0rd'
      click_button 'ログインする'
    end
  end
end
