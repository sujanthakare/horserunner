import React, { useState, useMemo } from 'react';
import { GameRace } from 'src/contexts/types';
import { Table } from 'semantic-ui-react';

const TableRow: React.FC<{ item: any }> = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <Table.Row>
      <Table.Cell width={1}>{item.startNumber}</Table.Cell>
      <Table.Cell width={1}>{item.horseName}</Table.Cell>
      <Table.Cell width={1}>{item.driverName}</Table.Cell>
      {(() => {
        if (!expanded) {
          return (
            <>
              <Table.Cell width={1}>
                <button onClick={() => setExpanded(true)}>Show</button>
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
};

const Race = ({ race }: { race: GameRace }) => {
  const { starts } = race;

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
          return <TableRow item={item} key={index} />;
        })}
      </Table.Body>
    </Table>
  );
};

export default Race;
