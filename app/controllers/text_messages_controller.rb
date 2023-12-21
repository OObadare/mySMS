class TextMessagesController < ApplicationController
    def create
        @message = TextMessage.new(message_params)

        if @message.save!
            # send_message(message_params)
            @message.update(status: "sent")
            render json: { message: 'Message sent successfully', status: 'success' }, status: :created
        else
            render json: { errors: @message.errors.full_messages, status: 'error' }, status: :unprocessable_entity
        end
    end

    def index

    end
end
