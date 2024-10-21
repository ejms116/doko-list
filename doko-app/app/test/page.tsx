
export default async function Home() {
    //const res = await fetch('https://api.github.com/repos/vercel/next.js');
    const res = await fetch('http://localhost:8080/api/groups/all');
    const data = await res.json();
  
    return (
      <div>
        <h1>Data fetched at build time</h1>
        <pre>{JSON.stringify(data, null, 2)}</pre>
      </div>
    );
  }