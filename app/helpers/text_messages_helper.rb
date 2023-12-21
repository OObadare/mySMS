require "twilio-ruby"

module TextMessagesHelper
    ACCOUNT_SID = "ACXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX"
    AUTH_TOKEN = "your_auth_token"
    

    def send_message(message_params)
        @client = Twilio::REST::Client.new(account_sid, auth_token)

        text = @client.messages.create(
            from: message_params.phone_number,
            to: twilio_number,
            body: message_params.message
        )
    end
end
