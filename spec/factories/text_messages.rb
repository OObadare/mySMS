FactoryBot.define do
  factory :text_message do
    phone_number {+15807165916}
    message {Faker::TvShows::RuPaul.queen}
    user_id {1}
  end
end
