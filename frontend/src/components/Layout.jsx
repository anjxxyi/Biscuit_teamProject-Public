import React from "react";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import PreviewHelp from "./preview/PreviewHelp";

import "../styles/base/layout.css";

const Layout = ({ darkMode, handleDarkMode, children }) => {
	return (
		<div className={darkMode ? "app darkMode" : "app"}>
			<Header darkMode={darkMode} handleDarkMode={handleDarkMode} />
				{children}
			<Footer />
			<PreviewHelp />
		</div>
	);
};

export default Layout;
