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
      <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-cyan-200 flex items-center justify-center p-4">
        <div className="text-center">
          <div className="text-6xl mb-4 animate-bounce">🐱</div>
          <div className="text-blue-800 text-2xl font-semibold">
            Loading adorable cats...
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-cyan-200 py-6 px-4 sm:py-8">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-blue-900 mb-2 drop-shadow-sm">
            Paws & Preferences
          </h1>
          <p className="text-blue-800 text-lg sm:text-xl">
            Find Your Favorite Kitty! 🐾
          </p>
        </div>

        {!isComplete ? (
          <>
            {/* Progress Bar */}
            <div className="mb-6 max-w-sm mx-auto">
              <div className="flex justify-between items-center mb-2">
                <span className="text-blue-900 font-semibold text-sm">
                  Cat {progress.current + 1} of {progress.total}
                </span>
                <span className="text-blue-800 text-sm">
                  {Math.round(((progress.current) / progress.total) * 100)}% Complete
                </span>
              </div>
              <div className="w-full bg-blue-100 rounded-full h-3 overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-full transition-all duration-300 ease-out"
                  style={{
                    width: `${((progress.current) / progress.total) * 100}%`,
                  }}
                />
              </div>
            </div>

            {/* Cat Card */}
            <div className="mb-8">
              {currentCat && (
                <CatCard
                  key={currentCat.id}
                  cat={currentCat}
                  onLike={() => handleSwipe(true)}
                  onDislike={() => handleSwipe(false)}
                />
              )}
            </div>
          </>
        ) : (
          <Summary results={swipeResults} onRestart={restart} />
        )}
      </div>

      {/* Footer */}
      <div className="text-center mt-12 text-blue-800/70 text-sm">
        <p>Powered by <a href="https://cataas.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-blue-900">Cataas</a></p>
      </div>
    </div>
  );
}

// import { useCats } from './hooks/useCats';
// import { CatCard } from './components/CatCard';
// import { Summary } from './components/Summary';

// export function App() {
//   const {
//     currentCat,
//     handleSwipe,
//     isComplete,
//     swipeResults,
//     progress,
//     loading,
//     restart
//   } = useCats();

//   if (loading) {
//     return (
//       <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-cyan-200 flex items-center justify-center">
//         <div className="text-blue-800 text-2xl font-semibold">Loading cats... 🐱</div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-blue-200 via-blue-300 to-cyan-200 py-8 px-4">
//       <div className="max-w-6xl mx-auto">
//         <h1 className="text-5xl font-bold text-blue-900 text-center mb-2">Paws & Preferences</h1>
//         <p className="text-blue-800 text-center mb-8">Find Your Favourite Kitty! 🐾</p>

//         {!isComplete ? (
//           <>
//             <div className="text-blue-900 text-center mb-4 font-semibold">
//               Cat {progress.current + 1} of {progress.total}
//             </div>
//             {currentCat && (
//               <CatCard
//                 key={currentCat.id}
//                 cat={currentCat}
//                 onLike={() => handleSwipe(true)}
//                 onDislike={() => handleSwipe(false)}
//               />
//             )}
//           </>
//         ) : (
//           <Summary results={swipeResults} onRestart={restart} />
//         )}
//       </div>
//     </div>
//   );
// }
