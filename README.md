# Get started

## Live demo

You can watch the [video for demo](doc/demo.mp4)

open <https://warm-plains-84315.herokuapp.com/> in your browser and do the following steps:

1. Click "Login with Twitch!" button and you will be directed to the Twitch login page

2. Login with your Twitch account and if succeed, you will be redirected back

3. After redirected, you will be provided a input box to set you favourite streamer's name

4. Input the streamer's name you want to subscribe, and click the "Add" button

5. Then a streamer page will be displayed, containing a live video, a chat room and a list of streamer's events.

    Events includes:

    a. user profile change

    b. new follower

    c. following other users

    d. stream change

## Run locally

1. `npm install`

2. set up environment variables either in command line or put a .env file:

    `PORT`: port number this application will be listening on

    `CLIENT_ID`: your twitch application client ID

    `REDIRECT`: your application home url being deployed

3. `npm start`

4. open http://localhost:$PORT


# Design and Implementation Details

This project contains two pages: a home page and a streamer page.

1. Home Page

    1.1 First, the home page provides a login function to login with Twitch account.
        After authorized, the application will get a token for further use.

    1.2 You can subscribe to a streamer. On this, this application will subscribe the
        topics of that user, and then waiting for events that will be sent by HTTP request
        from Twitch to previous specified callback endpoints

2. Streamer page

    2.1 This page embeds a twitch iframe containing a live video and chat room

    2.2 The server initiates a web socket, and this page will connect to it

    2.3 When server receives an event from Twitch, it will send the event to this page
        via web socket connect.
        Each web socket connection on the server side is attached with a user name
        which indicates the user of which the client is waiting for events. Therefore,
        only events from that user will be send to the client

# Furture work

1. This project doesn't employs a message queue or database to store events it receives,
    so only events received after the streamer page launched will be displayed. To improve
    this, an MQ or DB could be introduced to store offline events

2. Add and tune CSS for better UI

# Answers for Additional Questions:

> 1. How would you deploy the above on AWS? (ideally a rough architecture diagram will help)

To be honest, I don't have much experience on AWS. But I think since this is a single Node.js application, 
it can be easily deployed to AWS by Elastic Beanstalk with just some configuration and commands

> 2. Where do you see bottlenecks in your proposed architecture and how would you approach
> scaling this app starting from 100 reqs/day to 900MM reqs/day over 6 months?

The bottleneck would be the callback endpoints for Twitch subscription, while rest parts are able to 
be scaled horizontally. To improve this, a distributed message queue like Kafka should be incorporated serving
as the callback endpoints, and the server reads the messages from that. The messages can be managed by
users, i.e. create one Kafka topic for each subscribed user, and the server just subscribe to that topic.

