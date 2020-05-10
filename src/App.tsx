import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { Card, Layout } from 'antd';
import GameSchedule from './views/GameSchedule';
import GameTypeSelector from './views/GameTypeSelector';
import store from './redux/store';

function App() {
	const [gameType, setGameType] = useState();

	return (
		<Provider store={store}>
			<Layout>
				<Layout.Header>
					<h2 style={{ color: 'white' }}>Horse Runner</h2>
				</Layout.Header>
				<Layout.Content>
					<div style={{ margin: 20 }}>
						<Card style={{ marginBottom: 12 }}>
							<GameTypeSelector value={gameType} onChange={setGameType} />
						</Card>
						<GameSchedule gameType={gameType} />
					</div>
				</Layout.Content>
			</Layout>
		</Provider>
	);
}

export default App;
