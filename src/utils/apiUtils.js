// api.js

// export const fetchData = async () => {
//   try {
//     const response = await fetch(
//       "https://rahul-05.github.io/JWST_React_Three_Fiber/db.json"
//     );
//     const data = await response.json();
//     console.table(data.jwst);
//     return data;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     throw error;
//   }
// };



// api.js

import { useState, useEffect } from 'react';

export const useApiData = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://rahul-05.github.io/JWST_React_Three_Fiber/db.json'
        );
        const fetchedData = await response.json();
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return { data, loading, error };
};
