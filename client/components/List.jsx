import React from 'react';

const List = ({items, displayProperty, path}) => (
  <ul className="list-group">
    {items.map((item) => (
      <li className="list-group-item" key={item._id}>
        <a href={FlowRouter.path(path + "/" + item._id)}>{item[displayProperty]}</a>
      </li>
    ))}
  </ul>
);

export default List;