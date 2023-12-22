require "twilio-ruby"

class TwilioService
    account_sid = ENV['TWILIO_ACCOUNT_SID']
    auth_token = ENV['TWILIO_AUTH_TOKEN']
    twilio_number = ENV['TWILIO_NUMBER']

    def initialize(receiver_number)
        @receiver_number = receiver_number
        @account_sid = ENV['TWILIO_ACCOUNT_SID']
        @auth_token = ENV['TWILIO_AUTH_TOKEN']
        @twilio_number = ENV['TWILIO_NUMBER']
    end

    

    def send_message(body)
        @client = Twilio::REST::Client.new(@account_sid, @auth_token)

        text = @client.messages.create(
            from: @twilio_number,
            to: @receiver_number,
            body: body
        )
    end
end