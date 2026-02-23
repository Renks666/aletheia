import "@testing-library/jest-dom/vitest";
import React from "react";
import {vi} from "vitest";

vi.mock("next/image", () => ({
  default: (props: Record<string, unknown>) => {
    const {fill, priority, ...restProps} = props;
    void fill;
    void priority;

    return React.createElement("img", {
      ...restProps,
      alt: typeof props.alt === "string" ? props.alt : "",
    });
  },
}));

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = "0px";
  readonly thresholds: ReadonlyArray<number> = [0];

  disconnect() {
    return undefined;
  }

  observe() {
    return undefined;
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }

  unobserve() {
    return undefined;
  }
}

class MockResizeObserver implements ResizeObserver {
  disconnect() {
    return undefined;
  }

  observe() {
    return undefined;
  }

  unobserve() {
    return undefined;
  }
}

vi.stubGlobal("IntersectionObserver", MockIntersectionObserver);
vi.stubGlobal("ResizeObserver", MockResizeObserver);
