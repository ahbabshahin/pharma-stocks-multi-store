import { gql } from 'graphql-tag';
import { AuthPayload } from '../store/models/auth.model';

export const LOGIN = gql`
	mutation login($payload: AuthPayload!) {
		login(payload: $payload) {
			token
			user {
				_id
				username
			}
		}
	}
`;
