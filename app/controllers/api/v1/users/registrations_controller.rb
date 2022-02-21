class Api::V1::Users::RegistrationsController < Devise::RegistrationsController
  skip_before_action :process_token

  def create
    user = build_resource(sign_up_params)

    if user.save
      user.update(jwt: user.generate_jwt)
      sign_in(user)
      render json: {
        message: 'Signed up successfully.',
        user: user
      }, status: :ok
    else
      render json: { "errors": 'email or password is invalid' }, status: :unprocessable_entity
    end
  end
end
