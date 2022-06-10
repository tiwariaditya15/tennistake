export function debounce(callback: () => void, wait: number = 3000) {
  let timeoutId: NodeJS.Timer;
  return () => {
    window.clearTimeout(timeoutId);
    timeoutId = setInterval(() => {
      callback();
    }, wait);
  };
}
