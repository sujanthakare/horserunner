import React from 'react';

interface IProps {
	bg?: string;
}

const Box: React.FunctionComponent<IProps> = ({ children, bg }) => {
	return (
		<div
			style={{
				padding: '9px',
				margin: '4px',
				borderStyle: 'solid',
				borderWidth: '1px',
				borderColor: 'lightgrey',
				backgroundColor: bg,
			}}>
			{children}
		</div>
	);
};

export default Box;
