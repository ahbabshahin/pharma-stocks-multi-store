import axios from 'axios';

export const graphqlRequest = async (query: string, variables?: string) => {
	const response = await axios.post('YOUR_GRAPHQL_ENDPOINT', {
		query,
		variables,
	});
	return response.data;
};
