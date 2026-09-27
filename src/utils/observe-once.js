// Used by lightweight assets that can wait until their section is nearby.
export function observeOnce(element, callback, rootMargin = '200px 0px') {
  if (!('IntersectionObserver' in window)) {
    callback();
    return () => {};
  }
  const observer = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    observer.disconnect();
    callback();
  }, { rootMargin });
  observer.observe(element);
  return () => observer.disconnect();
}
