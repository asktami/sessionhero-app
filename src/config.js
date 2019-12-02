// hosted on Heroku using PostgreSQL db
export default {
	DATASOURCE: `postgresql`,
	API_ENDPOINT:
		process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
	AUTH_ENDPOINT:
		process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000/api',
	TOKEN_KEY: process.env.REACT_APP_API_KEY
};

// hosted locally using PostgreSQL db
// export default {
// 	DATASOURCE: `postgresql`,
// 	API_ENDPOINT: `http://localhost:8000/api`,
// 	AUTH_ENDPOINT: `http://localhost:8000/api`,
// 	TOKEN_KEY: '50ab4770-13fc-11ea-aaef-0800200c9a66'
// };
