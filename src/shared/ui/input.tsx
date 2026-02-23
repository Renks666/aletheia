import * as React from "react";

import {cn} from "@/shared/lib/utils/cn";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({className, type, ...props}, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "focus-ring flex h-11 w-full rounded-sm border border-line-soft bg-[rgba(20,20,24,0.72)] px-3 py-2 text-sm text-text shadow-sm transition-colors placeholder:text-muted/70 focus-visible:border-bronze-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export {Input};
