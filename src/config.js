// hosted on Heroku using PostgreSQL db
export default {
	DATASOURCE: `postgresql`,
	API_ENDPOINT: `https://cors-anywhere.herokuapp.com/https://asktami-sessionhero-api.herokuapp.com/api/`,
	AUTH_ENDPOINT: `https://cors-anywhere.herokuapp.com/https://asktami-sessionhero-api.herokuapp.com/api/`,
	TOKEN_KEY: 'sessionhero-client-auth-token'
};

// hosted locally using PostgreSQL db
// export default {
// 	DATASOURCE: `postgresql`,
// 	API_ENDPOINT: `http://localhost:8000/api`,
// 	AUTH_ENDPOINT: `http://localhost:8000/api`,
// 	TOKEN_KEY: 'sessionhero-client-auth-token'
// };
