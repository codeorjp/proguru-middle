# frozen_string_literal: true

require 'csv'

CSV.generate(headers: true, encoding: Encoding::SJIS) do |csv|
  csv_column_names = %w[クラスID 出席番号 初期パスワード]
  csv << csv_column_names
  @students.each do |student|
    csv_column_values = [
      student.class_room_id,
      student.number,
      student.initial_token
    ]
    csv << csv_column_values
  end
end
