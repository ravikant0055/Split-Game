/**
 * Fisher–Yates shuffle — unbiased and O(n).
 * @template T
 * @param {T[]} array
 * @returns {T[]}
 */
export function shuffle(array) {
  const out = [...array];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

/**
 * @param {string[]} imgSrcs
 */
export function createDeck(imgSrcs) {
  const pairs = imgSrcs.flatMap((img, pairId) => [
    { pairId, img, surfaceId: `${pairId}-a` },
    { pairId, img, surfaceId: `${pairId}-b` },
  ]);
  return shuffle(pairs).map((base, index) => ({
    ...base,
    index,
    isFlipped: false,
    isMatched: false,
  }));
}

async function decodeBitmap(img) {
  if (typeof img.decode === 'function') {
    try {
      await img.decode();
    } catch {
      /* decode() can reject; onload still means bytes are available */
    }
  }
}

/**
 * Load each image, then decode its bitmap so first paint (e.g. card flip) does not
 * stall the main thread. Progress reaches 100% only after decode is done per asset.
 *
 * @param {string[]} imageArray
 * @param {(pct: number) => void} [onProgress]
 */
export function preloadImages(imageArray, onProgress) {
  let ready = 0;
  const total = imageArray.length;
  return Promise.all(
    imageArray.map(
      (src) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            void (async () => {
              await decodeBitmap(img);
              ready++;
              onProgress?.(Math.round((ready / total) * 100));
              resolve(img);
            })();
          };
          img.onerror = () => reject(new Error(`Failed to load image: ${src}`));
        })
    )
  );
}

/**
 * Renders each unique URL in an off-DOM tree at game dimensions so the compositor
 * does the same work as real cards before the preview flip.
 *
 * @param {string[]} urls Same src strings used on cards (e.g. from loaded Image().src)
 */
export async function warmDisplayPipeline(urls, width = 110, height = 150) {
  const unique = [...new Set(urls)];
  const host = document.createElement('div');
  host.setAttribute('aria-hidden', 'true');
  host.style.cssText = [
    'position:fixed',
    'left:-9999px',
    'top:0',
    `width:${width}px`,
    `height:${height}px`,
    'overflow:hidden',
    'pointer-events:none',
    'opacity:0',
    'contain:strict',
  ].join(';');

  const images = unique.map((src) => {
    const el = document.createElement('img');
    el.src = src;
    el.width = width;
    el.height = height;
    el.decoding = 'sync';
    el.loading = 'eager';
    host.appendChild(el);
    return el;
  });

  document.body.appendChild(host);

  try {
    await Promise.all(
      images.map(
        (el) =>
          new Promise((resolve, reject) => {
            const finish = () => {
              void decodeBitmap(el)
                .then(() => resolve())
                .catch(() => resolve());
            };
            if (el.complete) {
              finish();
              return;
            }
            el.onload = finish;
            el.onerror = () =>
              reject(new Error(`Warm display failed for: ${el.src}`));
          })
      )
    );
    // Let layout + one paint flush so work matches real grid mount.
    await new Promise((r) =>
      requestAnimationFrame(() => requestAnimationFrame(r))
    );
  } finally {
    host.remove();
  }
}
