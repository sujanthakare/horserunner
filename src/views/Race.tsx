import React, { useState, useMemo } from 'react';
import { GameRace, GameType } from 'src/types';
import { Button, Table } from 'antd';

const Race = ({ race }: { race: GameRace; gameType?: GameType }) => {
	const { starts } = race;

	const [showCellsAtIndexMap, setShowCellsAtIndexMap] = useState<{ [x: string]: boolean }>({});

	const tableData = useMemo(() => {
		if (!starts) {
			return [];
		}

		return starts.map((startData, rowIndex) => {
			const {
				number: startNumber,
				driver: { firstName, lastName },
				horse: {
					name: horseName,
					trainer: { firstName: trainerFirstName, lastName: trainerLastName },
					pedigree: {
						father: { name: fatherName },
					},
				},
			} = startData;

			return {
				rowIndex,
				startNumber,
				horseName,
				driverName: `${firstName} ${lastName}`,
				trainerName: `${trainerFirstName} ${trainerLastName}`,
				fatherName,
			};
		});
	}, [starts]);

	const expandedCellRenderer = (value: string, { rowIndex }: { rowIndex: number }) => {
		if (!showCellsAtIndexMap[`${rowIndex}`]) {
			return null;
		}

		return value;
	};

	return (
		<Table
			pagination={false}
			dataSource={tableData}
			columns={[
				{
					title: 'Number',
					dataIndex: 'startNumber',
				},
				{
					title: 'Horse',
					dataIndex: 'horseName',
				},
				{
					title: 'Driver',
					dataIndex: 'driverName',
				},
				{
					title: 'Trainer',
					dataIndex: 'trainerName',
					render: (name, data) => {
						if (!showCellsAtIndexMap[`${data.rowIndex}`]) {
							return (
								<Button
									onClick={() => {
										setShowCellsAtIndexMap({
											...showCellsAtIndexMap,
											[`${data.rowIndex}`]: true,
										});
									}}>
									Show
								</Button>
							);
						}

						return name;
					},
				},
				{
					title: 'Father',
					dataIndex: 'fatherName',
					render: expandedCellRenderer,
				},
			]}
		/>
	);
};

export default Race;
