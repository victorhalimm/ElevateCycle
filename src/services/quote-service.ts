import { Quote } from '@/lib/types/quote';
import axios from 'axios';


const fetchQuote = async (category: string): Promise<Quote[]> => {
  const apiKey = 'GrSUJ+SvZ+ZFc1JyEFtepA==Awxj4vcav4DZ7HqP';
  const apiUrl = `https://api.api-ninjas.com/v1/quotes?category=${category}`;

  try {
    const response = await axios.get(apiUrl, {
      headers: { 'X-Api-Key': apiKey }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('Request failed:', error.message);
    } else {
      console.error('Unexpected error:', error);
    }

    return [];
  }
};

export { fetchQuote };