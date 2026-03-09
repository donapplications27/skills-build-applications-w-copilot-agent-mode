import React, { useEffect, useState } from 'react';

export default function Users() {
  const [items, setItems] = useState([]);
  const base = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : window.location.origin;
  const endpoint = `${base}/api/users/`;

  useEffect(() => {
    console.log('Fetching Users from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Raw users response:', data);
        const list = data && data.results ? data.results : data;
        console.log('Parsed users list:', list);
        setItems(list || []);
      })
      .catch((err) => console.error('Users fetch error', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Users</h2>
      <ul className="list-group">
        {items.map((it, idx) => (
          <li className="list-group-item" key={it.id || it._id || idx}>
            {it.name || it.email || JSON.stringify(it)}
          </li>
        ))}
      </ul>
    </div>
  );
}
