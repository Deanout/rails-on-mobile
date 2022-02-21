class User < ApplicationRecord
  devise :database_authenticatable,
         :registerable
  def generate_jwt
    JWT.encode({ id: id, exp: 60.days.from_now.to_i },
               Rails.application.credentials.development.devise[:jwt_secret_key])
  end
end
