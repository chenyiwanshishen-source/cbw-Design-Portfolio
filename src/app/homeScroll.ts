function shouldUseInstantHomeScroll() {
  return (
    window.innerWidth >= 1024 ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function scrollHomeToTop() {
  window.scrollTo({
    top: 0,
    behavior: shouldUseInstantHomeScroll() ? "auto" : "smooth",
  });
}

export function scrollToHomeSection(id: string) {
  const section = document.getElementById(id);
  if (!section) return false;

  const target =
    window.innerWidth >= 1024
      ? section.closest<HTMLElement>("[data-home-panel]") ?? section
      : section;

  target.scrollIntoView({
    block: "start",
    behavior: shouldUseInstantHomeScroll() ? "auto" : "smooth",
  });
  return true;
}
