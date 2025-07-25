
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Layout from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Inventory from "./pages/Inventory";
import CreateProduct from "./pages/CreateProduct";
import Customers from "./pages/Customers";
import CreateCustomer from "./pages/CreateCustomer";
import Sales from "./pages/Sales";
import Invoices from "./pages/Invoices";
import CreateInvoice from "./pages/CreateInvoice";
import Users from "./pages/Users";
import User from "./pages/User";
import CreateUser from "./pages/CreateUser";
import CreateBusiness from "./pages/CreateBusiness";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { useState } from "react";

// const queryClient = new QueryClient();

const App = () => {
  // <QueryClientProvider client={queryClient}>
    const [user, setUser] = useState(null); // Replace with actual authentication logic

	const handleLogin = () => {
		setUser({ username: 'testuser' }); // Simulate successful login
	};
  return (
		<TooltipProvider>
			<Toaster />
			<Sonner />
			<BrowserRouter>
				<Routes>
					{/* <Navigate replace={user ?}/> */}
					<Route path='/' element={user ? <Outlet /> : <Login />}>
						<Route path='/login' element={<Login />} />
						<Route
							path='/'
							element={
								<Layout>
									<Dashboard />
								</Layout>
							}
						/>
						<Route
							path='/inventory'
							element={
								<Layout>
									<Inventory />
								</Layout>
							}
						/>
						<Route
							path='/inventory/create'
							element={
								<Layout>
									<CreateProduct />
								</Layout>
							}
						/>
						<Route
							path='/customers'
							element={
								<Layout>
									<Customers />
								</Layout>
							}
						/>
						<Route
							path='/customers/create'
							element={
								<Layout>
									<CreateCustomer />
								</Layout>
							}
						/>
						<Route
							path='/sales'
							element={
								<Layout>
									<Sales />
								</Layout>
							}
						/>
						<Route
							path='/invoices'
							element={
								<Layout>
									<Invoices />
								</Layout>
							}
						/>
						<Route
							path='/invoices/create'
							element={
								<Layout>
									<CreateInvoice />
								</Layout>
							}
						/>
						<Route
							path='/users'
							element={
								<Layout>
									<Users />
								</Layout>
							}
						/>
						<Route
							path='/users/create'
							element={
								<Layout>
									<CreateUser />
								</Layout>
							}
						/>
						<Route
							path='/users/:userId'
							element={
								<Layout>
									<User />
								</Layout>
							}
						/>
						<Route
							path='/business/create'
							element={
								<Layout>
									<CreateBusiness />
								</Layout>
							}
						/>
						<Route path='*' element={<NotFound />} />
					</Route>
				</Routes>
			</BrowserRouter>
		</TooltipProvider>
  );
  // </QueryClientProvider>
};

export default App;
