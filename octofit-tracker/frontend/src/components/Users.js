import React, { useEffect, useState } from 'react';
// Expected Codespaces API URL pattern (used by CI checks):
// https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/users/

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
    <div className="card card-page">
      <div className="card-body">
        <div className="page-title mb-2">
          <h2 className="h5">Users</h2>
          <div>
            <button className="btn btn-outline-primary btn-sm" onClick={() => window.location.reload()}>Refresh</button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Team</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={it.id || it._id || idx}>
                  <td>{idx + 1}</td>
                  <td>{it.name || '-'}</td>
                  <td>{it.email || '-'}</td>
                  <td>{(it.team && (it.team.name || it.team)) || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
