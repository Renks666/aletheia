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
