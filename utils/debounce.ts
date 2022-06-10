export function debounce(callback: () => void, wait: number = 3000) {
  let timeoutId: NodeJS.Timer;
  return (...args: any[]) => {
    window.clearTimeout(timeoutId);
    timeoutId = setInterval(() => {
      callback.apply(null, []);
    }, wait);
  };
}
