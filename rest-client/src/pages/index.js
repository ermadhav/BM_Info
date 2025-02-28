import { useState, useEffect } from 'react';
import axios from 'axios';

export default function Home() {
  const [method, setMethod] = useState('GET');
  const [url, setUrl] = useState('');
  const [body, setBody] = useState('');
  const [response, setResponse] = useState(null);
  const [history, setHistory] = useState([]);

  const fetchHistory = async () => {
    const res = await axios.get('/api/requests');
    setHistory(res.data);
  };

  useEffect(() => {
    fetchHistory();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios({
        method,
        url,
        data: body ? JSON.parse(body) : undefined,
      });
      setResponse(res.data);
      await axios.post('/api/requests', { method, url, body });
      fetchHistory();
    } catch (error) {
      setResponse(error.response ? error.response.data : error.message);
    }
  };

  return (
    <div>
      <h1>REST Client</h1>
      <form onSubmit={handleSubmit}>
        <select value={method} onChange={(e) => setMethod(e.target.value)}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
        <input
          type="text"
          placeholder="URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
        <textarea
          placeholder="Body (JSON)"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
        <button type="submit">Send Request</button>
      </form>
      <h2>Response</h2>
      <pre>{JSON.stringify(response, null, 2)}</pre>
      <h2>History</h2>
      <ul>
        {history.map((req) => (
          <li key={req.id}>
            {req.method} {req.url} - {req.createdAt}
          </li>
        ))}
      </ul>
    </div>
  );
}