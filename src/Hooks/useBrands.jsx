import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useBrands() {
  // Function to fetch brands
  function getBrands() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/brands');
  }

  // Use the query hook to fetch and cache the brands data
  const response = useQuery({
    queryKey: ['brands'],
    queryFn: getBrands,
    select: (data) => data?.data.data, // Adjust the path to your data as needed
  });

  return response;
}
