import React, { useEffect, useState } from 'react';

export default function Activities() {
  const [items, setItems] = useState([]);
  const base = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : window.location.origin;
  const endpoint = `${base}/api/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Raw activities response:', data);
        const list = data && data.results ? data.results : data;
        console.log('Parsed activities list:', list);
        setItems(list || []);
      })
      .catch((err) => console.error('Activities fetch error', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Activities</h2>
      <ul className="list-group">
        {items.map((it, idx) => (
          <li className="list-group-item" key={it.id || it._id || idx}>
            {it.description || JSON.stringify(it)}
          </li>
        ))}
      </ul>
    </div>
  );
}
