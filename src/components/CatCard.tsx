import type { Cat } from "../types/Cat";

interface Props {
  cat: Cat;
  onLike: () => void;
  onDislike: () => void;
}

export function CatCard({ cat, onLike, onDislike }: Props) {
  return (
    <div className="w-80 bg-white rounded-xl shadow-lg p-4 mx-auto">
      <img
        key={cat.id} 
        src={cat.url}
        alt="cat"
        className="w-full h-80 object-cover rounded-lg"
      />
      <div className="flex justify-between mt-4">
        <button onClick={onDislike} className="px-4 py-2 bg-red-100 rounded-lg">
          👎 Dislike
        </button>
        <button onClick={onLike} className="px-4 py-2 bg-green-100 rounded-lg">
          👍 Like
        </button>
      </div>
    </div>
  );
}