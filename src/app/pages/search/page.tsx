'use client'
import { useSearchParams } from 'next/navigation'; // Use next/navigation in App Router
import { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Header from '@/app/component/Header';
import { IndianRupee } from 'lucide-react';

const SearchPage = () => {
  const searchParams = useSearchParams(); // Get the query parameters
  const query = searchParams.get('query'); // Extract the 'query' parameter from the URL
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (query) {
      const fetchResults = async () => {
        try {
          const response = await axios.get(`/api/getProduct?search=${encodeURIComponent(query)}`);
          setResults(response.data);
        } catch (error) {
          console.error('Error fetching search results:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchResults();
    }
  }, [query]);

  if (loading) return <p>Loading...</p>;

  return (
    <>
    <Header/>
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Search Results for `{query}`</h1>
      {results.length === 0 ? (
        <p>No results found.</p>
      ) : (
        <ul className='grid grid-cols-2 '>
          {results.map((result, index) => (
            <li key={index} className="mb-2">
              <Link href={`/pages/getProduct/${result._id}`}>
                <Card className='w-fit h-fit p-2'>
                  <Image src={result.images[0]} alt='productImg' width={200} height={100} />
                  <Card className=' rounded-none  font-semibold text-gray-600 '>

                  <p className='text-center '>
                  {result.name}
                    </p>
                    <p className=' flex justify-center items-center'>
                    {result.price}
                    <IndianRupee className='w-4 h-4'/>
                    </p>
                  </Card>
                </Card>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
    </>
  );
};

export default SearchPage;
