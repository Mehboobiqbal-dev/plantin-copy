import { useState, useEffect } from 'react';
import { ClipLoader } from 'react-spinners';

// Define the type for data
interface Data {
  message: string;
}

function Loading() {
  const [data, setData] = useState<Data | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate data fetching
    setTimeout(() => {
      setData({ message: 'Data loaded!' });
      setIsLoading(false);
    }, 2000);
  }, []);

  return (
    <div>
      {isLoading ? (
        <ClipLoader color="#123abc" loading={isLoading} size={50} />
      ) : (
        <p>{data?.message}</p>
      )}
    </div>
  );
}

export default Loading;