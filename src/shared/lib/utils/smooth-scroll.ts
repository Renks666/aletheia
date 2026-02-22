const MIN_TOP_GAP = 16;

function getStickyHeaderHeight() {
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  if (!header) {
    return 0;
  }

  return Math.ceil(header.getBoundingClientRect().height);
}

export function smoothScrollToId(id: string, block: ScrollLogicalPosition = "start") {
  if (typeof document === "undefined") {
    return;
  }

  const target = document.getElementById(id);
  if (!target) {
    return;
  }

  if (block === "center") {
    const headerHeight = getStickyHeaderHeight();
    const targetRect = target.getBoundingClientRect();
    const targetTop = window.scrollY + targetRect.top;
    const viewportHeight = window.innerHeight;
    const visibleHeight = Math.max(viewportHeight - headerHeight, 0);

    const centerOffset = (visibleHeight - targetRect.height) / 2;
    const topOffset =
      centerOffset > MIN_TOP_GAP ? headerHeight + centerOffset : headerHeight + MIN_TOP_GAP;

    window.scrollTo({
      top: Math.max(targetTop - topOffset, 0),
      behavior: "smooth",
    });
    return;
  }

  target.scrollIntoView({
    behavior: "smooth",
    block,
  });
}
