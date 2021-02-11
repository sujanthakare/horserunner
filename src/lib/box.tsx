import React from 'react';

interface IProps {
  bg?: string;
}

const Box: React.FC<IProps> = ({ children, bg }) => {
  return (
    <div style={{ display: 'flex', padding: 3 }}>
      <div style={{ backgroundColor: bg }}>{children}</div>
    </div>
  );
};

export default Box;
