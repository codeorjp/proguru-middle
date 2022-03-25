# frozen_string_literal: true

module AssertSelectHelper
  def assert_select_error_explanation(text)
    assert_select 'div#error_explanation li', text: text
  end
end
