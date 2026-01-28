import { useState, useRef } from "react";
import type { Cat } from "../types/Cat";

interface Props {
  cat: Cat;
  onLike: () => void;
  onDislike: () => void;
}

export function CatCard({ cat, onLike, onDislike }: Props) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  const resetCard = () => {
    setDragOffset(0);
    setIsDragging(false);
    setTouchStart(null);
    setTouchEnd(null);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setIsDragging(true);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (touchStart === null) return;
    const currentTouch = e.targetTouches[0].clientX;
    const diff = currentTouch - touchStart;
    setDragOffset(diff);
    setTouchEnd(currentTouch);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) {
      resetCard();
      return;
    }

    const distance = touchEnd - touchStart;
    const isLeftSwipe = distance < -minSwipeDistance;
    const isRightSwipe = distance > minSwipeDistance;

    if (isLeftSwipe) {
      // Animate out to the left
      setDragOffset(-1000);
      setTimeout(() => {
        onDislike();
        resetCard();
      }, 300);
    } else if (isRightSwipe) {
      // Animate out to the right
      setDragOffset(1000);
      setTimeout(() => {
        onLike();
        resetCard();
      }, 300);
    } else {
      // Return to center
      resetCard();
    }
  };

  // Mouse events for desktop
  const onMouseDown = (e: React.MouseEvent) => {
    setTouchEnd(null);
    setTouchStart(e.clientX);
    setIsDragging(true);
  };

  const onMouseMove = (e: React.MouseEvent) => {
    if (touchStart === null || !isDragging) return;
    const diff = e.clientX - touchStart;
    setDragOffset(diff);
    setTouchEnd(e.clientX);
  };

  const onMouseUp = () => {
    if (!touchStart || !touchEnd) {
      resetCard();
      return;
    }

    const distance = touchEnd - touchStart;
    const isLeftSwipe = distance < -minSwipeDistance;
    const isRightSwipe = distance > minSwipeDistance;

    if (isLeftSwipe) {
      setDragOffset(-1000);
      setTimeout(() => {
        onDislike();
        resetCard();
      }, 300);
    } else if (isRightSwipe) {
      setDragOffset(1000);
      setTimeout(() => {
        onLike();
        resetCard();
      }, 300);
    } else {
      resetCard();
    }
  };

  const onMouseLeave = () => {
    if (isDragging) {
      resetCard();
    }
  };

  // Calculate rotation and opacity based on drag
  const rotation = dragOffset / 20;
  const opacity = Math.max(0.5, 1 - Math.abs(dragOffset) / 300);

  // Show like/dislike indicators
  const showLikeIndicator = dragOffset > 30;
  const showDislikeIndicator = dragOffset < -30;

  return (
    <div className="relative w-full max-w-sm mx-auto select-none">
      {/* Card */}
      <div
        key={cat.id}
        ref={cardRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseLeave}
        className="relative bg-white rounded-xl shadow-2xl p-4 cursor-grab active:cursor-grabbing touch-none"
        style={{
          transform: `translateX(${dragOffset}px) rotate(${rotation}deg)`,
          transition: isDragging ? "none" : "transform 0.3s ease-out",
          opacity: opacity,
        }}
      >
        {/* Like Indicator */}
        {showLikeIndicator && (
          <div
            className="absolute top-8 left-8 text-6xl font-bold text-green-500 border-4 border-green-500 rounded-lg px-4 py-2 rotate-[-20deg] pointer-events-none z-10"
            style={{
              opacity: Math.min(1, dragOffset / 100),
            }}
          >
            LIKE
          </div>
        )}

        {/* Dislike Indicator */}
        {showDislikeIndicator && (
          <div
            className="absolute top-8 right-8 text-6xl font-bold text-red-500 border-4 border-red-500 rounded-lg px-4 py-2 rotate-[20deg] pointer-events-none z-10"
            style={{
              opacity: Math.min(1, Math.abs(dragOffset) / 100),
            }}
          >
            NOPE
          </div>
        )}

        <img
          src={cat.url}
          alt="cat"
          className="w-full h-96 object-cover rounded-lg pointer-events-none"
          draggable={false}
        />

        {/* Swipe instruction */}
        <div className="text-center mt-4 text-gray-600 font-medium">
          👈 Swipe left to dislike, right to like 👉
        </div>
      </div>
    </div>
  );
}

// import type { Cat } from "../types/Cat";

// interface Props {
//   cat: Cat;
//   onLike: () => void;
//   onDislike: () => void;
// }

// export function CatCard({ cat, onLike, onDislike }: Props) {
//   return (
//     <div className="w-80 bg-white rounded-xl shadow-lg p-4 mx-auto">
//       <img
//         key={cat.id} 
//         src={cat.url}
//         alt="cat"
//         className="w-full h-80 object-cover rounded-lg"
//       />
//       <div className="flex justify-between mt-4">
//         <button onClick={onDislike} className="px-4 py-2 bg-red-100 rounded-lg">
//           👎 Dislike
//         </button>
//         <button onClick={onLike} className="px-4 py-2 bg-green-100 rounded-lg">
//           👍 Like
//         </button>
//       </div>
//     </div>
//   );
// }
