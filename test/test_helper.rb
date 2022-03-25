# frozen_string_literal: true

ENV['RAILS_ENV'] ||= 'test'
require_relative '../config/environment'
require 'rails/test_help'
require_relative 'helpers/sign_in_helper'
require_relative 'helpers/assert_select_helper'
require_relative 'helpers/sign_in_system_test_helper'

class ActionDispatch::IntegrationTest
  include SignInHelper
  include AssertSelectHelper
end

class ApplicationSystemTestCase < ActionDispatch::SystemTestCase
  include SignInSystemTestHelper
end

class ActiveSupport::TestCase
  SeedFu.quiet = true
  SeedFu.seed
  # Setup all fixtures in test/fixtures/*.yml for all tests in alphabetical order.
  fixtures :all

  # Add more helper methods to be used by all tests here...
end
