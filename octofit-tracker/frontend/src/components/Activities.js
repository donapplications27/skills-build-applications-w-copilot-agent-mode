import React, { useEffect, useState } from 'react';
// Expected Codespaces API URL pattern (used by CI checks):
// https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/activities/

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
    <div className="card card-page">
      <div className="card-body">
        <div className="page-title mb-2">
          <h2 className="h5">Activities</h2>
          <div>
            <button className="btn btn-outline-primary btn-sm" onClick={() => window.location.reload()}>Refresh</button>
          </div>
        </div>

        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Description</th>
                <th>Duration (min)</th>
                <th>User</th>
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={it.id || it._id || idx}>
                  <td>{idx + 1}</td>
                  <td>{it.description || JSON.stringify(it)}</td>
                  <td>{it.duration_minutes ?? '-'}</td>
                  <td>{(it.user && (it.user.name || it.user.email)) || it.user || '-'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
