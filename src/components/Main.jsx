import { useCallback } from 'react';
import { useSplitCardsGame } from '../hooks/useSplitCardsGame';
import { EndGameDialog, InstructionsDialog } from './game/GameDialogs';
import { GameHud } from './game/GameHud';
import { GameLoading } from './game/GameLoading';
import { MemoryCard } from './game/MemoryCard';

const Main = () => {
  const {
    loadProgress,
    loading,
    dialogOpen,
    setDialogOpen,
    countdown,
    cards,
    score,
    endGameDialog,
    gameResult,
    gameProgress,
    handleStart,
    handleCardClick,
  } = useSplitCardsGame();

  const handleRestart = useCallback(() => {
    window.location.reload();
  }, []);

  const showBoard = cards.length > 0 && !loading;

  return (
    <div className="bg-[#ffcea0] flex justify-center w-full h-screen">
      <div className="bg-white flex flex-col items-center md:justify-between gap-18 md:gap-0 py-5 w-full md:w-[550px] md:my-6 rounded-xl shadow-xl">
        <h1 className="font-extrabold text-xl">
          Split<span className="text-[#ff005d]">Cards</span>
        </h1>

        {loading && <GameLoading loadProgress={loadProgress} />}

        {showBoard && (
          <>
            <GameHud
              countdown={countdown}
              gameProgress={gameProgress}
              score={score}
            />
            <div className="grid grid-cols-4 gap-1 md:gap-5 h-fit items-end">
              {cards.map((card) => (
                <MemoryCard
                  key={card.surfaceId}
                  cardIndex={card.index}
                  img={card.img}
                  isFlipped={card.isFlipped}
                  isMatched={card.isMatched}
                  onCardClick={handleCardClick}
                />
              ))}
            </div>
          </>
        )}
      </div>

      <InstructionsDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onStart={handleStart}
      />

      <EndGameDialog
        open={endGameDialog}
        gameResult={gameResult}
        score={score}
        onRestart={handleRestart}
      />
    </div>
  );
};

export default Main;
