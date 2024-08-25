import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

export default function useCategories() {
  // Function to fetch categories
  function getCategories() {
    return axios.get('https://ecommerce.routemisr.com/api/v1/categories');
  }

  // Use the query hook to fetch and cache the categories data
  const response = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    select: (data) => data?.data.data, // Adjust the path to your data as needed
  });

  return response;
}