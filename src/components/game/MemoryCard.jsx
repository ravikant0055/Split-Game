import { memo, useCallback } from 'react';
import { AiOutlineQq } from 'react-icons/ai';

function MemoryCardComponent({
  cardIndex,
  img,
  isFlipped,
  isMatched,
  onCardClick,
}) {
  const showFace = isFlipped || isMatched;

  const handleClick = useCallback(() => {
    onCardClick(cardIndex);
  }, [cardIndex, onCardClick]);

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`card md:w-[110px] md:h-[150px] w-[100px] h-[140px] rounded shadow-lg cursor-pointer p-0 border-0 bg-transparent ${
        showFace ? 'flipped' : ''
      }`}
    >
      <div className="card-inner">
        <div className="card-front bg-gradient-to-tl from-[#ff9500] to-[#ff9589] w-full h-full flex items-center justify-center">
          <AiOutlineQq className="text-4xl text-white" aria-hidden />
        </div>
        <div className="card-back">
          <img
            src={img}
            alt=""
            className="w-full h-full object-cover"
            width={110}
            height={150}
            decoding="sync"
            loading="eager"
            fetchPriority="high"
          />
        </div>
      </div>
    </button>
  );
}

export const MemoryCard = memo(MemoryCardComponent);
