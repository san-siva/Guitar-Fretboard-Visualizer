import React from 'react';
import Home from './components/Home';
import './App.scss';

function App() {
	return (
		<div className="App">
			<Home />
			<div className="footer">
				<a
					href="https://www.linkedin.com/in/santhosh-siva-385ab018b/"
					target="_blank"
					rel="noopener noreferrer"
				>
					linkedin.com
				</a>
				<a
					href="https://github.com/grace-luminous/guitar-tab-maker-react"
					target="_blank"
					rel="noopener noreferrer"
				>
					github.com
				</a>
			</div>
		</div>
	);
}

export default App;
