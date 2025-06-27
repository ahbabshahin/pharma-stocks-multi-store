import React from 'react';
import ReactDOM from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { store } from './store';
import client from './apollo/client';
import App from './App.tsx';
import './index.css';
import 'antd/dist/reset.css';
import 'bootstrap/dist/css/bootstrap.min.css';

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
