'use client'

import { useEffect, useState } from 'react';

export function Test() {
  const [backResponse, setBackResponse] = useState([]);

  useEffect(() => {
    const api = async () => {
      const data = await fetch("http://localhost:8080/api/groups/all");
      const jsonData = await data.json();
      console.log(jsonData)
      setBackResponse(jsonData)
    };
    api();
  }, []);

  return (
    <div>
      <h1>Message received from the backend</h1>
      <ul>
        {backResponse.map(item => (
          <li key={item.id}>
            {item.name}
            {' '}
            
          </li>
        ))}
      </ul>

    </div>
  );
}

export default App;