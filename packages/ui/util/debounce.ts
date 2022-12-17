export const debounce = <F extends (...args: any) => any>(callback: F, wait: number) => {
  let timeoutId: number
  return (...args: Parameters<F>) => {
    window.clearTimeout(timeoutId);
    timeoutId = window.setTimeout(() => {
      callback.apply(null, args);
    }, wait);
  }
}