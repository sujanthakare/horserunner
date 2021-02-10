import React, { HTMLProps } from 'react';

interface ISelectProps {
	options: Array<{ text: string; value: string }>;
	placeholder: string;
}

const Select: React.FC<ISelectProps & HTMLProps<HTMLSelectElement>> = ({ options, placeholder, ...props }) => {
	return (
		<select {...props}>
			{placeholder && <option value="">{placeholder}</option>}
			{options.map((item, index) => {
				return (
					<option key={index} value={item.value}>
						{item.text}
					</option>
				);
			})}
		</select>
	);
};

export default Select;
