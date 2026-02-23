import * as React from "react";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/shared/lib/utils/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-1 text-[0.72rem] font-medium tracking-[0.06em] transition-colors",
  {
    variants: {
      variant: {
        default:
          "border-line-soft bg-[color:color-mix(in_srgb,var(--color-surface-900)_75%,transparent)] text-text",
        muted:
          "border-line-soft bg-[color:color-mix(in_srgb,var(--color-surface-900)_90%,transparent)] text-muted",
        accent:
          "border-line-strong bg-[color:color-mix(in_srgb,var(--color-primary-800)_56%,transparent)] text-bronze-300",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  },
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({className, variant, ...props}: BadgeProps) {
  return <div className={cn(badgeVariants({variant}), className)} {...props} />;
}

export {Badge, badgeVariants};
