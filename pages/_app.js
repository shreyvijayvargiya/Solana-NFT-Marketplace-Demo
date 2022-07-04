import React from "react";
import "tailwindcss/tailwind.css";
import { Provider } from "react-redux";
import store from "redux/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import "react-toastify/dist/ReactToastify.css";
import "global.css";

const MyApp = ({ Component, pageProps }) => {
	const persistor = persistStore(store);
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<Component {...pageProps} />
			</PersistGate>
		</Provider>
	);
};
export default MyApp;
