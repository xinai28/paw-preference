import type { SwipeResult } from '../types/Cat';

interface SummaryProps {
  results: SwipeResult[];
  onRestart: () => void;
}

export const Summary = ({ results, onRestart }: SummaryProps) => {
  const likedCats = results.filter(r => r.liked);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-4xl font-bold text-center mb-4">Your Cat Preferences!</h2>
      <p className="text-xl text-center mb-8">
        You liked {likedCats.length} out of {results.length} cats! 🐱
      </p>

      {likedCats.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-8">
          {likedCats.map(r => (
            <img
              key={r.cat.id}
              src={r.cat.url}
              alt="liked cat"
              className="w-full h-48 object-cover rounded-lg shadow-md"
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mb-8">You didn't like any cats? Try again! 😿</p>
      )}

      <div className="text-center">
        <button
          onClick={onRestart}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full shadow-lg"
        >
          Start Over
        </button>
      </div>
    </div>
  );
};
