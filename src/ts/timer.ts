function formatDurationHHMMSS(duration: number) {
  const h = Math.floor(duration / 3600).toString();
  const m = (Math.floor(duration / 60) % 60).toString();
  const s = (Math.floor(duration) % 60).toString();
  return h + ":" + m.padStart(2, "0") + ":" + s.padStart(2, "0");
}

function updateTimers(pageLoadedTime: number) {
  const timers = Array.from(document.getElementsByClassName("timer"));
  timers.forEach(timer => {
    const currentTime = (new Date()).getTime() / 1000;
    const duration = parseInt(timer.getAttribute("data-duration")) -
                     (currentTime - pageLoadedTime);
    timer.innerHTML = formatDurationHHMMSS(Math.max(0, duration));
  });
}

export function initTimers() {
  const pageLoadedTime = (new Date()).getTime() / 1000;
  updateTimers(pageLoadedTime);
  setInterval(() => { updateTimers(pageLoadedTime); }, 100);
}
