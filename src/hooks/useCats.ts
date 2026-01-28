import { useState, useEffect, useCallback } from 'react';
import type { Cat, SwipeResult } from '../types/Cat';
import { fetchCatsList } from '../services/catAPI';

export const useCats = () => {
  const [cats, setCats] = useState<Cat[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [swipeResults, setSwipeResults] = useState<SwipeResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  // Load cats on mount or restart
  useEffect(() => {
    const loadCats = async () => {
      setLoading(true);
      const fetchedCats = await fetchCatsList(15);
      setCats(fetchedCats);
      setCurrentIndex(0);
      setSwipeResults([]);
      setLoading(false);
    };

    loadCats();
  }, [refreshTrigger]);

  const handleSwipe = useCallback((liked: boolean) => {
    // Use the current index to get the cat BEFORE updating
    const cat = cats[currentIndex];
    if (!cat) return; // safeguard

    // Add to swipe results
    setSwipeResults(prev => [...prev, { cat, liked }]);

    // Move to next cat
    setCurrentIndex(prev => prev + 1);
  }, [cats, currentIndex]); // Add dependencies

  const restart = useCallback(() => {
    setRefreshTrigger(prev => prev + 1);
  }, []);

  return {
    currentCat: cats[currentIndex] || null,
    handleSwipe,
    isComplete: currentIndex >= cats.length,
    swipeResults,
    likedCats: swipeResults.filter(r => r.liked),
    progress: { current: currentIndex, total: cats.length },
    loading,
    restart,
  };
};