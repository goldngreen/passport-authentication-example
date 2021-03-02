
# TODO

## sqlite integration

| Done | Description | Priority |
| ---- | ----------- | -------- |
|  [ ] | Use sqlite instead of sample table | 1 |


## User Authentication Features

| Done | Description | Priority |
| ---- | ----------- | -------- |
|  [ ] | Register Local User | 1 |
|  [ ] | Login | 1 |
|  [ ] | Logout | 1 |
|  [ ] | Create password for new user | 2 |
|  [ ] | Enable on email confirmation | 2 |
|  [ ] | Profile page | 2 |
|  [ ] | Change password | 2 |
|  [ ] | Recover forgotten password | 2 |
|  [ ] | Register Google user | 3 |
|  [ ] | Register Facebook user | 4 |
|  [ ] | Register Twitter user | 4 |
|  [ ] | 2 factor authentication | 4 |


# Original Project Template README.md

## Passport.js User Authentication
This demonstrates using [Passport.js](http://passportjs.org/) for user authentication.

The app allows you to login using built-in users (db/users.js) or login with Facebook/Twitter/etc. You can add many other social login providers easily - search for Strategies on http://passportjs.org.

The app is based on the [local](https://github.com/passport/express-4.x-local-example) and [Facebook](https://github.com/passport/express-4.x-facebook-example) examples.

## Getting Started
To configure OAuth providers with your own app, see the provider's developer docs to create your own app, then stick your secrets in `.env`.

Callback URLs to use with third-party login providers end with /login/provider/return e.g. /login/twitter/return.

Note that users and sessions are just stored in memory in this example, so you'll want to add a datastore of some form.
