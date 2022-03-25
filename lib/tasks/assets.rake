# frozen_string_literal: true

namespace :assets do
  desc 'Upload compiled assets to GCS'
  task upload_to_gcs: :environment do
    require 'google/cloud/storage'
    storage = Google::Cloud::Storage.new(
      project_id: 'proguru-middle',
      credentials: Rails.application.credentials.gcs_credentials
    )
    bucket = storage.bucket(Rails.application.credentials.gcs_bucket, skip_lookup: true)

    Rails.logger.level = :info
    Dir.glob('public/**/*').each do |file|
      next unless File.file?(file)

      path = File.path(file).sub(%r{^public/}, '')
      Rails.logger.info("Uploading gs://#{bucket.name}/#{path}")
      bucket.create_file(file, path, acl: :public)
    end
    Dir.glob('app/assets/fonts/**/*').each do |file|
      next unless File.file?(file)

      path = File.path(file).sub(%r{^app/}, '').sub('fonts/', '')
      Rails.logger.info("Uploading gs://#{bucket.name}/#{path}")
      bucket.create_file(file, path, acl: :public)
    end
  end
end
