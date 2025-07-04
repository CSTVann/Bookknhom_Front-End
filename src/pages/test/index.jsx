// Example in a React component or useEffect
useEffect(() => {
  fetch('http://localhost:8000/api/ping') // Use your backend URL
    .then(res => res.json())
    .then(data => console.log('Connected:', data))
    .catch(err => console.error('Error:', err));
}, []);
