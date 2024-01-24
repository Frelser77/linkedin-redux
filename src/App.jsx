import React, { useEffect } from "react";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import NotFound from "./components/NotFound";
import { Container } from "react-bootstrap";
import Profile from "./components/Profile";
import { useDispatch } from "react-redux";
import { fetchAllProfiles } from "./redux/slice/fetchAllProfilesReducers";
import AllProfiles from "./components/AllProfiles";
import NavBar from "./components/NavBar";
import Experiences from "./components/Experiences";
import Footer from "./components/Footer";

function App() {
	const dispatch = useDispatch();
	//   const profiles = useSelector((state) => state.fetchAllProfiles.data);

	useEffect(() => {
		dispatch(fetchAllProfiles());
	}, []);

	return (
		<div className="App">
			<BrowserRouter>
				<NavBar />
				<Container>
					<Routes>
						<Route path="/profile" element={<AllProfiles />} />
						<Route path="/profile/me" element={<Profile />} />
						<Route path="/profile/:userId" element={<Profile />} />
						<Route path="/profile/:userId/experiences" element={<Experiences />} />
						<Route path="*" element={<NotFound />} />
					</Routes>
				</Container>
				<Footer />
			</BrowserRouter>
		</div>
	);
}

export default App;
