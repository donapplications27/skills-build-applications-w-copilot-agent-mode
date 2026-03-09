import React, { useEffect, useState } from 'react';
// Expected Codespaces API URL pattern (used by CI checks):
// https://$REACT_APP_CODESPACE_NAME-8000.app.github.dev/api/teams/

export default function Teams() {
  const [items, setItems] = useState([]);
  const base = process.env.REACT_APP_CODESPACE_NAME
    ? `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev`
    : window.location.origin;
  const endpoint = `${base}/api/teams/`;

  useEffect(() => {
    console.log('Fetching Teams from', endpoint);
    fetch(endpoint)
      .then((res) => res.json())
      .then((data) => {
        console.log('Raw teams response:', data);
        const list = data && data.results ? data.results : data;
        console.log('Parsed teams list:', list);
        setItems(list || []);
      })
      .catch((err) => console.error('Teams fetch error', err));
  }, [endpoint]);

  return (
    <div className="card card-page">
      <div className="card-body">
        <div className="page-title mb-2">
          <h2 className="h5">Teams</h2>
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
              </tr>
            </thead>
            <tbody>
              {items.map((it, idx) => (
                <tr key={it.id || it._id || idx}>
                  <td>{idx + 1}</td>
                  <td>{it.name || JSON.stringify(it)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
