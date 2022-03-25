# frozen_string_literal: true

module TeacherDecorator
  include Rails.application.routes.url_helpers

  DEFAULT_ICON_URL = '/images/human.png'

  def icon_url
    return rails_blob_url(icon) if icon.attached?

    DEFAULT_ICON_URL
  end

  def nickname
    super || fullname
  end

  def number
    t('activerecord.models.teacher')
  end

  private

    def default_url_options
      Rails.application.config.default_url_options
    end
end
