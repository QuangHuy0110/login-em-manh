import React, { useEffect, useState } from 'react';
import { message, Spin } from 'antd';
import { fetchData } from '../../service';

const Home = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);  

  useEffect(() => {
    const getData = async () => {
      setLoading(true);
      try {
        const result = await fetchData();  // Fetch data from the service
        setData(result);  // Update state with fetched data
      } catch (err: any) {
        setError(err.message || 'Failed to fetch data');
        message.error('Failed to load data');
      } finally {
        setLoading(false);
      }
    };

    getData();  
  }, []); 

  if (loading) {
    return <Spin tip="Loading..." />;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Data from API:</h2>
      <pre>{JSON.stringify(data, null, 2)}</pre> {/* Render the fetched data */}
    </div>
  );
};

export default Home;
