# frozen_string_literal: true

module Api::SayHelloHelper
  HELLOS = %w[おはよう こんにちは].freeze
  def reply(hello, hour)
    return %(サーバで "#{hello}" を受け取りました！) if HELLOS.exclude?(hello)

    if hour.to_i < 12
      hello == 'おはよう' ? 'おはよう！' : 'おはようの時間だよ！'
    else
      hello == 'こんにちは' ? 'こんにちは！' : 'こんにちはの時間だよ！'
    end
  end
end
