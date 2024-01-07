class TextMessagesController < ApplicationController
    before_action :authenticate_user!

    def create
        @message = TextMessage.new(text_message_params)
        if @message.save!
            twilio_service = TwilioService.new("+#{text_message_params[:phone_number]}")
            res = twilio_service.send_message(text_message_params[:message])
            if res.class == Twilio::REST::RestError
                @message.update(status: "error")
                render json: {message: "Twilio Error: #{res.message}"}, status: :unprocessable_entity
            else 
                @message.update(status: "sent")
                render json: { message: 'Message sent successfully', status: 'success' }, status: :created
            end
        else
            debugger
            render json: { errors: @message.errors.full_messages, status: 'error' }, status: :unprocessable_entity
        end
    end

    def index
        @text_messages = TextMessage.where(user_id: current_user.id)
        render json: @text_messages
    end

    private

    def text_message_params
        params.permit(:user_id, :phone_number, :message, :status)
    end
end
