import React, { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [items, setItems] = useState([]);
  const base = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : window.location.origin;
  const endpoint = `${base}/api/leaderboard/`;

  useEffect(() => {
    console.log('Fetching Leaderboard from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Raw leaderboard response:', data);
        const list = data && data.results ? data.results : data;
        console.log('Parsed leaderboard list:', list);
        setItems(list || []);
      })
      .catch((err) => console.error('Leaderboard fetch error', err));
  }, [endpoint]);

  return (
    <div>
      <h2>Leaderboard</h2>
      <ol className="list-group list-group-numbered">
        {items.map((it, idx) => (
          <li className="list-group-item" key={it.id || it._id || idx}>
            {it.user ? (it.user.name || it.user.email) : JSON.stringify(it)} - {it.score}
          </li>
        ))}
      </ol>
    </div>
  );
}
