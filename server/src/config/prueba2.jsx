import { useState, useEffect } from 'react';
import axios from 'axios';

const useCompanies = (query = '') => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCompanies = async () => {
      try {
        setLoading(true);
        const response = await axios.get('http://localhost:4000/find-companies', {
          params: { company: query }
        });
        setCompanies(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCompanies();
  }, [query]);

  return { companies, loading, error };
};

export default useCompanies;
