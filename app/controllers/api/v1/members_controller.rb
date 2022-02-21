# app/controllers/members_controller.rb
class Api::V1::MembersController < ApplicationController
  before_action :authenticate_api_v1_user!
  def show
    render json: {
      message: "If you see this, you're in!",
      user: current_api_v1_user
    }, status: :ok
  end
end
