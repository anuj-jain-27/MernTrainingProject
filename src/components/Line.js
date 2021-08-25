import React from 'react';
const Line = ({ color }) => (
  <hr
      style={{
          color: color,
          backgroundColor: color,
          height: 1
      }}
  />
);

export default Line;