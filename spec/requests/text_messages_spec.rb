require 'rails_helper'

# RSpec.describe "TextMessages", type: :request do

RSpec.describe "TextMessages", type: :request do
  describe "GET" do 
    it "shows the user's text messages" do
      new_user = create(:user)
      sign_in new_user
      create(:text_message, user_id: new_user.id)
      get "/text_messages"
      expect(JSON.parse(response.body).count).to eq(1)
    end

    it "shows *only* the user's text messages" do 
      initial_count = TextMessage.count
      new_user = create(:user)
      second_user = create(:user)
      sign_in new_user
      create(:text_message, user_id: new_user.id)
      sign_out new_user
      sign_in second_user
      create(:text_message, user_id: second_user.id)
      expect(TextMessage.count).to eq(initial_count + 2)
      get "/text_messages"
      expect(JSON.parse(response.body).count).to eq(1)
    end

  end

  describe "POST" do
    let(:successful_params) do
      {
          phone_number: "+15807165916",
          message: "hello world",
          status: "pending"
      }
    end

    it "creates a text message" do

      initial_count = TextMessage.count
      post "/text_messages", params: successful_params

      expect(response.status).to eq(401)

      new_user = create(:user)

      sign_in new_user
      successful_params[:user_id] = new_user.id

      post "/text_messages", params: successful_params
      expect(response.status).to eq(201)
      expect(TextMessage.count).to eq(initial_count + 1)
    end

    it "fails to create a text with invalid atts" do 
      new_user = create(:user)
      sign_in new_user

      successful_params[:user_id] = new_user.id
      successful_params[:message] = nil

      post "/text_messages", params: successful_params
      expect(response.status).to eq(422)
    end
  end
end