# SessionHero

![SessionHero screenshot](https://github.com/asktami/sessionhero-app-for-postgres/blob/master/sessionhero.png 'SessionHero')

[View Live](https://sessionhero-app.now.sh/)

## Description

Attendee Conference Session Scheduler / SessionTracker / Agenda Builder

- a React Fullstack App

- uses the FileMaker DevCon 2019 sessions list (exported from FMDevToGo from [https://www.filemaker.com/](https://www.filemaker.com/))

- anyone going to the home page will see a list of all sessions

- anyone can filter the session list by day or track

- anyone can register and login

- after logging in, you can click on a session to add comments

- after logging in, you can click on a star to add a session to / remove a session from their schedule

- after logging in, you can see your schedule, i.e. list of sessions they plan on attending

- after logging in, you can filter your schedule by day or track

Works with [https://github.com/asktami/sessionhero-api](https://github.com/asktami/sessionhero-api).

## Built With

- React
- React-Router
- PostgreSQL
- Knex
- Node
- Express
- bcryptjs
- jsonwebtoken

## Tested With

- Jasmine
- Jest
- Enzyme
- Mocha
- Chai
- Supertest

## Setup

1. See [https://github.com/asktami/sessionhero-api](https://github.com/asktami/sessionhero-api) for instructions on installing the backend API

2. Clone this repo

3. In Terminal, change to the directory on your computer that contains this repo

4. Install dependencies: `npm install`
5. Environment:

   - Prepare the environment file: `cp example.env .env`
   - Replace values in `.env` with your custom values
   - Replace the value for `REACT_APP_API_KEY` with the same API token value you use in your backend API

6. Start the app in a web browser: `npm start`

---

## Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br>
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: https://facebook.github.io/create-react-app/docs/code-splitting

### Analyzing the Bundle Size

This section has moved here: https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size

### Making a Progressive Web App

This section has moved here: https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app

### Advanced Configuration

This section has moved here: https://facebook.github.io/create-react-app/docs/advanced-configuration

### Deployment

This section has moved here: https://facebook.github.io/create-react-app/docs/deployment

### `npm run build` fails to minify

This section has moved here: https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify
