// export default {
// 	API_ENDPOINT: 'http://localhost:8000/api',
// 	TOKEN_KEY: 'sessionhero-client-auth-token'
// };

// hosted using json db
// https://cors-anywhere.herokuapp.com/
// export default {
// 	DATASOURCE: `json`,
// 	API_ENDPOINT: `https://my-json-server.typicode.com/asktami/sessionhero-app`,
// 	AUTH_ENDPOINT: `https://reqres.in/api/login`,
// 	TOKEN_KEY: 'sessionhero-client-auth-token'
// };

// hosted locally using PostgreSQL db
export default {
	DATASOURCE: `postgresql`,
	API_ENDPOINT: `http://localhost:8000/api`,
	AUTH_ENDPOINT: `http://localhost:8000/api`,
	TOKEN_KEY: 'sessionhero-client-auth-token'
};
