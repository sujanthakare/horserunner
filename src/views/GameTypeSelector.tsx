import React from 'react';
import { Select } from 'antd';
import { GameType } from 'src/types';

const GameTypeSelector = ({ value, onChange }: any) => {
	return (
		<Select placeholder="Select game type" style={{ width: 200 }} showSearch value={value} onChange={onChange}>
			<Select.Option value={GameType.V75}>{GameType.V75}</Select.Option>
			<Select.Option value={GameType.V65}>{GameType.V65}</Select.Option>
			<Select.Option value={GameType.V64}>{GameType.V64}</Select.Option>
			<Select.Option value={GameType.V4}>{GameType.V4}</Select.Option>
		</Select>
	);
};

export default GameTypeSelector;
