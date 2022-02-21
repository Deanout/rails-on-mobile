# app/controllers/users/sessions_controller.rb
class Api::V1::Users::SessionsController < Devise::SessionsController
  prepend_before_action :require_no_authentication, only: []

  def create
    puts "CREATE ACTION IN SESSIONS CONTROLLER #{api_v1_user_signed_in?}"
    unless current_api_v1_user.nil?
      return render json: {
        message: 'Already signed in.',
        user: current_api_v1_user
      }
    end

    user = User.find_by_email(params[:user][:email])
    if user && user.valid_password?(params[:user][:password])
      token = user.generate_jwt
      sign_in(user)
      render json: {
        message: 'Signed in successfully.',
        token: token
      }, status: :ok
    else
      render json: { errors: { 'email or password' => ['is invalid'] } }, status: :unprocessable_entity
    end
  end

  protected

  def sign_in_params
    devise_parameter_sanitizer.sanitize(:sign_in)
  end

  private

  def respond_to_on_destroy
    puts 'respond_to_on_destroy'
    update_denylist
    render json: {
      message: 'You signed out.',
      user: current_api_v1_user
    }, status: :ok
  rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
    head :unauthorized
  end

  def update_denylist
    puts 'update_denylist'
    jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1],
                             Rails.application.credentials.development.devise[:jwt_secret_key]).first
    jwt = JwtDenylist.find_or_create_by(jti: jwt_payload['id'],
                                        exp: Time.at(jwt_payload['exp']))
    sign_out(User.find(jwt_payload['id']))
  end
end
