# README

This is a SMS app that uses the Twilio API to send text messages.
[Hosted App](https://mysmsapp-410618.uk.r.appspot.com/)

Locally, the backend runs on localhost:3000, while the frontend runs on localhost:4200.
## To run the app:
You may have to create a .env file.

### BACKEND:

`cd` into the home directory
bundle install
bundle exec rake db:create
bundle exec rake db:migrate
rails s

### FRONTEND:
cd into the `frontend` directory
npm install
ng serve
