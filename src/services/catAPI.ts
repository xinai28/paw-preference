import type { Cat } from '../types/Cat';

const BASE_URL = 'https://cataas.com';

interface CatApiResponse {
  _id: string;
  tags?: string[];
}

export async function fetchCatsList(limit = 15): Promise<Cat[]> {
  try {
    // Fetch cat list from API
    const res = await fetch(`${BASE_URL}/api/cats?limit=${limit}`);
    const data: CatApiResponse[] = await res.json();

    // Filter out cats without _id
    const validCats = data.filter(cat => !!cat._id);

    // Map API cats to Cat type (direct image URLs with timestamp to prevent caching)
    const cats: Cat[] = validCats.map(cat => ({
      id: cat._id!,
      url: `${BASE_URL}/cat/${cat._id}?t=${Date.now()}-${Math.random()}`,
    }));

    // Add fallback cats if API returns too few
    while (cats.length < limit) {
      cats.push({
        id: `fallback-${Date.now()}-${cats.length}`,
        url: `${BASE_URL}/cat?t=${Date.now()}-${Math.random()}`, 
      });
    }

    return cats;
  } catch (err) {
    console.error('Error fetching cats:', err);

    // Fallback if API fails completely
    return Array.from({ length: limit }, (_, i) => ({
      id: `fallback-${Date.now()}-${i}`,
      url: `${BASE_URL}/cat?t=${Date.now()}-${i}-${Math.random()}`, 
    }));
  }
}
