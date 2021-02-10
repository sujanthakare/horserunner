import React, { useState, useMemo } from 'react';
import { GameRace } from 'src/contexts/types';
import { Table } from 'semantic-ui-react';

const Race = ({ race }: { race: GameRace }) => {
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
    <Table>
      <Table.Header>
        <Table.Row>
          {['Number', 'Horse', 'Driver', 'Trainer', 'Father'].map((title, index) => {
            return <Table.HeaderCell key={index}>{title}</Table.HeaderCell>;
          })}
        </Table.Row>
      </Table.Header>
      <Table.Body>
        {tableData.map((item, index) => {
          return (
            <Table.Row>
              <Table.Cell width={1}>{item.startNumber}</Table.Cell>
              <Table.Cell width={1}>{item.horseName}</Table.Cell>
              <Table.Cell width={1}>{item.driverName}</Table.Cell>
              {(() => {
                if (!showCellsAtIndexMap[`${item.rowIndex}`]) {
                  return (
                    <>
                      <Table.Cell width={1}>
                        <button
                          onClick={() =>
                            setShowCellsAtIndexMap({
                              ...showCellsAtIndexMap,
                              [`${item.rowIndex}`]: true,
                            })
                          }>
                          Show
                        </button>
                      </Table.Cell>
                      <Table.Cell width={1}></Table.Cell>
                    </>
                  );
                } else {
                  return (
                    <>
                      <Table.Cell width={1}>{item.trainerName}</Table.Cell>
                      <Table.Cell width={1}>{item.fatherName}</Table.Cell>
                    </>
                  );
                }
              })()}
            </Table.Row>
          );
        })}
      </Table.Body>
    </Table>
  );

  // return (
  // 	<Table
  // 		rowKey="rowIndex"
  // 		pagination={false}
  // 		dataSource={tableData}
  // 		columns={[
  // 			{
  // 				title: 'Number',
  // 				dataIndex: 'startNumber',
  // 			},
  // 			{
  // 				title: 'Horse',
  // 				dataIndex: 'horseName',
  // 			},
  // 			{
  // 				title: 'Driver',
  // 				dataIndex: 'driverName',
  // 			},
  // 			{
  // 				title: 'Trainer',
  // 				dataIndex: 'trainerName',
  // 				render: (name, data) => {
  // 					if (!showCellsAtIndexMap[`${data.rowIndex}`]) {
  // 						return (
  // 							<button
  // 								onClick={() => {
  // 									setShowCellsAtIndexMap({
  // 										...showCellsAtIndexMap,
  // 										[`${data.rowIndex}`]: true,
  // 									});
  // 								}}>
  // 								Show
  // 							</button>
  // 						);
  // 					}

  // 					return name;
  // 				},
  // 			},
  // 			{
  // 				title: 'Father',
  // 				dataIndex: 'fatherName',
  // 				render: expandedCellRenderer,
  // 			},
  // 		]}
  // 	/>
  // );
};

export default Race;
