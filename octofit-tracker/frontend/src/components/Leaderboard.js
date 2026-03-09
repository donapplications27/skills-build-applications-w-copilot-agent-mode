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
    <div className="card card-page">
      <div className="card-body">
        <div className="page-title mb-2">
          <h2 className="h5">Leaderboard</h2>
          <div>
            <button className="btn btn-outline-primary btn-sm" onClick={() => window.location.reload()}>Refresh</button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Score</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={it.id || it._id || idx}>
                  <td>{idx + 1}</td>
                  <td>{it.user ? (it.user.name || it.user.email) : JSON.stringify(it.user) || '-'}</td>
                  <td>{it.score ?? '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
