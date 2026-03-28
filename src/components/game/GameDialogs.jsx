import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';

export function InstructionsDialog({ open, onOpenChange, onStart }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader className="text-start">
          <DialogTitle className="font-bold text-xl">How To Play?</DialogTitle>
          <DialogDescription>
            <span className="text-lg text-slate-800 block">
              Match all the cards within 30 seconds!
            </span>
            <ul className="list-disc px-4 py-2 space-y-1 text-slate-700">
              <li>See all the match cards for first 2 seconds</li>
              <li>Flip a card to reveal</li>
              <li>You will get 5 points for each correct match</li>
              <li>Beat the timer to win!</li>
            </ul>
          </DialogDescription>
        </DialogHeader>
        <button
          type="button"
          onClick={onStart}
          className="px-10 py-2 w-fit cursor-pointer rounded-md text-white bg-gradient-to-r from-[#f50a0a] to-[#ff5f02]"
        >
          Start
        </button>
      </DialogContent>
    </Dialog>
  );
}

export function EndGameDialog({ open, gameResult, score, onRestart }) {
  const isWin = gameResult === 'win';

  return (
    <Dialog open={open}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="font-bold text-xl">
            {isWin ? '🎉 You Win!' : '⏱️ Game Over'}
          </DialogTitle>
          <DialogDescription className="text-md text-slate-700">
            {isWin
              ? `Great job! Your score is ${score} points.`
              : `Time’s up! Try again to beat the clock.`}
          </DialogDescription>
        </DialogHeader>
        <button
          type="button"
          onClick={onRestart}
          className="mt-4 px-6 py-2 rounded-md text-white bg-gradient-to-r from-[#f50a0a] to-[#ff5f02]"
        >
          Restart Game
        </button>
      </DialogContent>
    </Dialog>
  );
}
