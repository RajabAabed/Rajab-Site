/** Runs `callback` when the main thread is idle. Returns a cancel function. */
export function onIdle(callback, timeout = 2000) {
  if ("requestIdleCallback" in window) {
    const id = window.requestIdleCallback(callback, { timeout });
    return () => window.cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 200);
  return () => clearTimeout(id);
}

/** Runs `callback` once the page has fully loaded and the browser is idle. */
export function afterLoad(callback) {
  let cancelIdle = () => {};
  const run = () => {
    cancelIdle = onIdle(callback);
  };
  if (document.readyState === "complete") run();
  else window.addEventListener("load", run, { once: true });
  return () => {
    window.removeEventListener("load", run);
    cancelIdle();
  };
}

/*
 * Work that only matters once the visitor engages (scroll-driven animation, smooth
 * scrolling, WebGL) is queued here and runs on the first scroll, touch, pointer move or
 * key press. Jobs run one per task, in the order they were queued, so the first
 * interaction never turns into a single long main-thread task.
 */
const INTERACTION_EVENTS = ["pointerdown", "pointermove", "wheel", "touchstart", "keydown", "scroll"];
const queue = [];
let interacted = false;
let draining = false;

function drain() {
  const job = queue.shift();
  if (!job) {
    draining = false;
    return;
  }
  if (!job.cancelled) job.callback();
  setTimeout(drain, 0);
}

function startDraining() {
  if (draining) return;
  draining = true;
  setTimeout(drain, 0);
}

function handleInteraction() {
  if (interacted) return;
  interacted = true;
  INTERACTION_EVENTS.forEach((type) => window.removeEventListener(type, handleInteraction, true));
  // Off-screen sections skip layout until now (see .defer-render); ScrollTrigger
  // needs their real sizes before it measures anything.
  document.documentElement.classList.add("is-engaged");
  startDraining();
}

/** Queues `callback` for the visitor's first interaction. Returns a cancel function. */
export function onFirstInteraction(callback) {
  const job = { callback, cancelled: false };
  queue.push(job);
  if (interacted) {
    startDraining();
  } else if (queue.length === 1) {
    INTERACTION_EVENTS.forEach((type) =>
      window.addEventListener(type, handleInteraction, { capture: true, passive: true })
    );
  }
  return () => {
    job.cancelled = true;
  };
}

/**
 * True when WebGL is hardware accelerated. Software rasterisers (SwiftShader,
 * llvmpipe) would run the full-screen shader on the CPU and stall the page.
 */
export function supportsFastWebGL() {
  if (navigator.connection?.saveData) return false;
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    if (!gl) return false;
    const info = gl.getExtension("WEBGL_debug_renderer_info");
    const renderer = info ? String(gl.getParameter(info.UNMASKED_RENDERER_WEBGL)) : "";
    gl.getExtension("WEBGL_lose_context")?.loseContext();
    return !/swiftshader|llvmpipe|software|basic render/i.test(renderer);
  } catch {
    return false;
  }
}
