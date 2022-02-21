class ApplicationController < ActionController::API
  respond_to :json
  before_action :process_token

  private

  # Check for auth headers - if present, decode or send unauthorized response (called always to allow current_user)
  def process_token
    if request.headers['Authorization'].present?
      begin
        token = request.headers['Authorization'].split(' ')[1]
        jwt_payload = JWT.decode(request.headers['Authorization'].split(' ')[1],
                                 Rails.application.credentials.development.devise[:jwt_secret_key]).first
        head :unauthorized if Time.at(jwt_payload['exp']) < Time.now
        head :unauthorized unless JwtDenylist.find_by(jti: jwt_payload['id'], exp: Time.at(jwt_payload['exp'])).nil?
        puts "jwt_payload: #{jwt_payload['id']}"
        @current_api_v1_user_id = jwt_payload['id']
        current_api_v1_user.update(jwt: token)
      rescue JWT::ExpiredSignature, JWT::VerificationError, JWT::DecodeError
        puts 'Threw exception'
      end
    end
  end

  # If user has not signed in, return unauthorized response (called only when auth is needed)
  def authenticate_api_v1_user!(_options = {})
    puts 'authenticate_api_v1_user'
    head :unauthorized unless api_v1_user_signed_in?
  end

  # set Devise's current_user using decoded JWT instead of session
  def current_api_v1_user
    puts 'current_api_v1_user'
    return if @current_api_v1_user_id.nil?

    @current_api_v1_user ||= super || User.find(@current_api_v1_user_id)
  end

  # check that authenticate_user has successfully returned @current_user_id (user is authenticated)
  def api_v1_user_signed_in?
    puts "@current_api_v1_user_id.present?: #{@current_api_v1_user_id.present?}"
    @current_api_v1_user_id.present?
  end
end
