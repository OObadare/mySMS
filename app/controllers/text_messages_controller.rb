class TextMessagesController < ApplicationController
    def create
        @message = TextMessage.new(text_message_params)
        if @message.save!
            twilio_service = TwilioService.new( text_message_params[:phone_number])
            twilio_service.send_message(text_message_params[:message])
            @message.update(status: "sent")
            render json: { message: 'Message sent successfully', status: 'success' }, status: :created
        else
            render json: { errors: @message.errors.full_messages, status: 'error' }, status: :unprocessable_entity
        end
    end

    def index
        @text_messages = TextMessage.all 
        render json: @text_messages
    end

    private

    def text_message_params
        params.permit(:user_id, :phone_number, :message, :status)
    end
end
