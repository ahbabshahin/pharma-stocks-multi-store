import ReactDOM  from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import React from 'react';
import { ApolloProvider } from '@apollo/client';
import client from './apollo/client.ts';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { store } from './store';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<ApolloProvider client={client}>
					<App />
				</ApolloProvider>
			</QueryClientProvider>
		</Provider>
	</React.StrictMode>
);