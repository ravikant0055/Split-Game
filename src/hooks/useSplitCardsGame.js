import { useCallback, useEffect, useRef, useState } from 'react';
import {
  CARD_IMAGE_MODULES,
  GAME_DURATION_SEC,
  LOAD_COMPLETE_MS,
  MISMATCH_FLIP_MS,
  PREVIEW_MS,
} from '../game/constants';
import { createDeck, preloadImages, warmDisplayPipeline } from '../game/cardUtils';

const initialCountdown = GAME_DURATION_SEC;

export function useSplitCardsGame() {
  const [loadProgress, setLoadProgress] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [gameActive, setGameActive] = useState(false);
  const [previewDone, setPreviewDone] = useState(false);
  const [countdown, setCountdown] = useState(initialCountdown);

  const [cards, setCards] = useState([]);
  const [score, setScore] = useState(0);
  const [endGameDialog, setEndGameDialog] = useState(false);
  const [gameResult, setGameResult] = useState('');

  const sessionRef = useRef(0);
  const mismatchTimeoutRef = useRef(null);
  const interactionLockRef = useRef(false);

  const clearMismatchTimeout = useCallback(() => {
    if (mismatchTimeoutRef.current) {
      clearTimeout(mismatchTimeoutRef.current);
      mismatchTimeoutRef.current = null;
    }
  }, []);

  useEffect(() => () => clearMismatchTimeout(), [clearMismatchTimeout]);

  const handleStart = useCallback(async () => {
    const session = ++sessionRef.current;
    setDialogOpen(false);
    setLoading(true);
    setLoadProgress(0);
    setCards([]);
    setPreviewDone(false);
    setEndGameDialog(false);
    setGameResult('');
    setScore(0);
    setCountdown(initialCountdown);
    interactionLockRef.current = false;
    clearMismatchTimeout();

    try {
      // Most of the bar: fetch + decode. Last step (100%): warm DOM/compositor path.
      const loadedImgs = await preloadImages(CARD_IMAGE_MODULES, (pct) =>
        setLoadProgress(Math.round(pct * 0.88))
      );
      if (sessionRef.current !== session) return;

      const imageSrcs = loadedImgs.map((img) => img.src);
      await warmDisplayPipeline(imageSrcs);
      if (sessionRef.current !== session) return;

      setLoadProgress(100);

      const shuffled = createDeck(imageSrcs);

      setTimeout(() => {
        if (sessionRef.current !== session) return;
        setCards(shuffled.map((c) => ({ ...c, isFlipped: true })));
        setLoading(false);
        setGameActive(true);

        setTimeout(() => {
          if (sessionRef.current !== session) return;
          setCards((prev) => prev.map((card) => ({ ...card, isFlipped: false })));
          setPreviewDone(true);
        }, PREVIEW_MS);
      }, LOAD_COMPLETE_MS);
    } catch (err) {
      console.error('Image preload failed', err);
      setLoading(false);
    }
  }, [clearMismatchTimeout]);

  const timerShouldRun = gameActive && previewDone && !endGameDialog;

  useEffect(() => {
    if (!timerShouldRun) return;

    const audio = new Audio('/song.mp3');
    audio.play().catch((e) => console.warn('Audio play failed:', e));

    const interval = setInterval(() => {
      setCountdown((prev) => (prev <= 1 ? 0 : prev - 1));
    }, 1000);

    return () => {
      clearInterval(interval);
      audio.pause();
      audio.removeAttribute('src');
    };
  }, [timerShouldRun]);

  useEffect(() => {
    if (!gameActive || !previewDone) return;
    if (cards.length === 0) return;

    if (cards.every((c) => c.isMatched)) {
      setGameResult('win');
      setEndGameDialog(true);
      setGameActive(false);
      return;
    }

    if (countdown === 0 && cards.some((c) => !c.isMatched)) {
      setGameResult('lose');
      setEndGameDialog(true);
      setGameActive(false);
    }
  }, [countdown, cards, gameActive, previewDone]);

  const handleCardClick = useCallback(
    (index) => {
      if (!previewDone || !gameActive || endGameDialog) return;
      if (interactionLockRef.current) return;

      setCards((prev) => {
        const card = prev[index];
        if (!card || card.isFlipped || card.isMatched) return prev;

        const openIndices = prev.reduce((acc, c, i) => {
          if (c.isFlipped && !c.isMatched) acc.push(i);
          return acc;
        }, []);

        if (openIndices.length >= 2) return prev;

        if (openIndices.length === 0) {
          return prev.map((c, i) => (i === index ? { ...c, isFlipped: true } : c));
        }

        const firstIdx = openIndices[0];
        const first = prev[firstIdx];

        let next = prev.map((c, i) => (i === index ? { ...c, isFlipped: true } : c));

        if (first.pairId === card.pairId) {
          next = next.map((c, i) =>
            i === firstIdx || i === index
              ? { ...c, isMatched: true, isFlipped: true }
              : c
          );
          setScore((s) => s + 5);
          clearMismatchTimeout();
          return next;
        }

        clearMismatchTimeout();
        interactionLockRef.current = true;
        mismatchTimeoutRef.current = setTimeout(() => {
          setCards((curr) =>
            curr.map((c, i) =>
              i === firstIdx || i === index ? { ...c, isFlipped: false } : c
            )
          );
          interactionLockRef.current = false;
          mismatchTimeoutRef.current = null;
        }, MISMATCH_FLIP_MS);

        return next;
      });
    },
    [
      previewDone,
      gameActive,
      endGameDialog,
      clearMismatchTimeout,
    ]
  );

  const gameProgress =
    initialCountdown > 0 ? (countdown / initialCountdown) * 100 : 0;

  return {
    loadProgress,
    loading,
    dialogOpen,
    setDialogOpen,
    gameActive,
    countdown,
    cards,
    score,
    endGameDialog,
    gameResult,
    gameProgress,
    handleStart,
    handleCardClick,
  };
}
