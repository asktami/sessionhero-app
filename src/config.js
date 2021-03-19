// my cors-anywhere
// https://asktami-cors-anywhere.herokuapp.com/

// hosted on Heroku using PostgreSQL db
const prod = {
	DATASOURCE: `postgresql`,
	API_ENDPOINT: `https://asktami-sessionhero-api.herokuapp.com/api`,
	AUTH_ENDPOINT: `https://asktami-sessionhero-api.herokuapp.com/api`,
	TOKEN_KEY: process.env.REACT_APP_API_KEY,
};

// hosted locally using PostgreSQL db
const dev = {
	DATASOURCE: `postgresql`,
	API_ENDPOINT: `http://localhost:8000/api`,
	AUTH_ENDPOINT: `http://localhost:8000/api`,
	TOKEN_KEY: process.env.REACT_APP_API_KEY,
};

// Default to dev if not set
export const config = process.env.NODE_ENV === 'production' ? prod : dev;
