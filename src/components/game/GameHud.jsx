import { BiAlarm } from 'react-icons/bi';
import { Progress } from '../ui/progress';

export function GameHud({ countdown, gameProgress, score }) {
  return (
    <div className="w-[92%] flex flex-col gap-5 items-center rounded-md border-slate-400 p-2">
      <span
        className={`flex gap-2 text-md items-center font-bold ${
          countdown < 10 ? 'text-[#f10000]' : ''
        }`}
      >
        <BiAlarm className="text-2xl" aria-hidden />
        {countdown}s
      </span>
      <Progress
        value={gameProgress}
        className="w-[100%] h-[10px] [&>div]:bg-[#ff5353] [&_[data-slot=progress-indicator]]:transition-none"
      />
      <div className="text-md font-semibold">Score: {score}</div>
    </div>
  );
}
