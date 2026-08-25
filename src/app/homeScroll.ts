function shouldUseInstantHomeScroll() {
  return (
    window.innerWidth >= 1024 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function scrollHomeToTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

export function scrollToHomeSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return false;

  section.scrollIntoView({
    block: "start",
    behavior: "smooth",
  });
  return true;
}
