import { useCats } from './hooks/useCats';
import { CatCard } from './components/CatCard';
import { Summary } from './components/Summary';

export function App() {
  const {
    currentCat,
    handleSwipe,
    isComplete,
    swipeResults,
    progress,
    loading,
    restart
  } = useCats();

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-cyan-200 flex items-center justify-center">
        <div className="text-blue-800 text-2xl font-semibold">Loading cats... 🐱</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-cyan-200 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-5xl font-bold text-blue-900 text-center mb-2">Paws & Preferences</h1>
        <p className="text-blue-800 text-center mb-8">Find Your Favourite Kitty! 🐾</p>

        {!isComplete ? (
          <>
            <div className="text-blue-900 text-center mb-4 font-semibold">
              Cat {progress.current + 1} of {progress.total}
            </div>
            {currentCat && (
              <CatCard
                key={currentCat.id}
                cat={currentCat}
                onLike={() => handleSwipe(true)}
                onDislike={() => handleSwipe(false)}
              />
            )}
          </>
        ) : (
          <Summary results={swipeResults} onRestart={restart} />
        )}
      </div>
    </div>
  );
}
