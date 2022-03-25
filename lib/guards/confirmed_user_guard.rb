# frozen_string_literal: true

class ConfirmedUserGuard < Clearance::SignInGuard
  def call
    if signed_in? && user_confirmed?
      next_guard
    elsif signed_in?
      failure('利用登録確認メールより，登録手続きを完了させてください。')
    else
      failure('正しいメールアドレス，パスワードを入力してください。')
    end
  end

  def user_confirmed?
    current_user.email_confirmed_at.present?
  end
end
