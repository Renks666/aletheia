import * as React from "react";

import {cn} from "@/shared/lib/utils/cn";

const Textarea = React.forwardRef<HTMLTextAreaElement, React.ComponentProps<"textarea">>(
  ({className, ...props}, ref) => {
    return (
      <textarea
        className={cn(
          "focus-ring flex min-h-[112px] w-full rounded-sm border border-line-soft bg-[rgba(20,20,24,0.72)] px-3 py-2 text-sm text-text shadow-sm transition-colors placeholder:text-muted/70 focus-visible:border-bronze-300 focus-visible:outline-none disabled:cursor-not-allowed disabled:opacity-50",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Textarea.displayName = "Textarea";

export {Textarea};
