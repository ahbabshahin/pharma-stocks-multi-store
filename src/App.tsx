import React from 'react';
import { useQuery, gql } from '@apollo/client';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from './store';
import { increment, decrement } from './store/counterSlice';
import { Button } from 'antd';
import './index.css';

const GET_EXAMPLE = gql`
  query GetExample {
    Pokemon {
      id
    }
  }
`;

function App() {
	const { data, loading, error } = useQuery(GET_EXAMPLE);
	const count = useSelector((state: RootState) => state.counter.value);
	const dispatch = useDispatch();

	return (
		<div className='bg-blue-500 text-black p-4'>
			<h1 className='text-2xl'>Hello, Tailwind CSS!</h1>
			<Button type='primary'>Ant Design Button</Button>
			<button className='btn btn-success mt-2'>Bootstrap Button</button>
			<div>
				{loading ? (
					<p>Loading...</p>
				) : error ? (
					<p>Error: {error.message}</p>
				) : (
					<p>GraphQL Data: {JSON.stringify(data)}</p>
				)}
			</div>
			<div className='mt-4'>
				<p>Counter: {count}</p>
				<button
					className='btn btn-primary mr-2'
					onClick={() => dispatch(increment())}
				>
					Increment
				</button>
				<button
					className='btn btn-secondary'
					onClick={() => dispatch(decrement())}
				>
					Decrement
				</button>
			</div>
		</div>
	);
}

export default App;
