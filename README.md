# README

This is a SMS app that uses the Twilio API to send text messages.

Locally, the backend runs on localhost:3000, while the frontend runs on localhost:4200.
To run the app:

## BACKEND:

`cd` into the home directory
bundle install
bundle exec rake db:create
bundle exec rake db:migrate
rails s

## FRONTEND:
cd into the `frontend` directory
npm install
ng serve




TODO: move twilio ENV vars in a more proper location?
TODO: hardcode +1 into numbers for ease of use?