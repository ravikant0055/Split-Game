import { Progress } from '../ui/progress';

export function GameLoading({ loadProgress }) {
  return (
    <div className="flex flex-col items-center justify-center w-full h-full gap-4">
      <h2 className="text-lg font-semibold">Loading Game...</h2>
      <Progress
        value={loadProgress}
        className="w-[80%] h-[12px] [&>div]:bg-[#ff5353]"
      />
      <span>{loadProgress}%</span>
    </div>
  );
}
