import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";

import {cn} from "@/shared/lib/utils/cn";

const buttonVariants = cva(
  "focus-ring inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full border text-sm font-semibold transition-all duration-200 focus-visible:ring-2 focus-visible:ring-bronze-300 focus-visible:ring-offset-1 focus-visible:ring-offset-[var(--color-bg-950)] disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        primary:
          "border-transparent bg-cta px-5 py-3 text-text shadow-volume hover:-translate-y-0.5 hover:brightness-[1.02] hover:shadow-cta",
        cta:
          "relative overflow-hidden border-[rgba(201,164,119,0.46)] bg-[linear-gradient(138deg,#3f2b63_0%,#573978_47%,#7a614b_100%)] px-5 py-3 font-heading text-[0.94rem] font-semibold tracking-[0.015em] text-white [text-shadow:0_1px_0_rgba(8,6,12,0.44)] shadow-[0_0_0_1px_rgba(201,164,119,0.2),0_14px_30px_rgba(17,12,28,0.55),inset_0_1px_0_rgba(255,255,255,0.12)] before:pointer-events-none before:absolute before:inset-0 before:bg-[linear-gradient(180deg,rgba(255,255,255,0.16),rgba(255,255,255,0)_44%)] before:opacity-70 hover:-translate-y-0.5 hover:scale-[1.03] hover:brightness-[1.04] hover:shadow-[0_0_0_1px_rgba(201,164,119,0.35),0_18px_36px_rgba(17,12,28,0.64),inset_0_1px_0_rgba(255,255,255,0.16)]",
        secondary:
          "border-line-strong bg-[color:color-mix(in_srgb,var(--color-surface-900)_65%,transparent)] px-5 py-3 text-muted hover:border-bronze-300 hover:bg-[color:color-mix(in_srgb,var(--color-surface-900)_82%,transparent)] hover:text-text",
        ghost:
          "border-transparent bg-transparent px-5 py-3 text-text hover:border-line-soft hover:bg-[color:color-mix(in_srgb,var(--color-surface-900)_35%,transparent)]",
      },
      size: {
        default: "h-11",
        sm: "h-9 px-4 text-xs",
        lg: "h-12 px-6 text-base",
        icon: "size-10 rounded-full p-0",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({className, variant, size, asChild = false, ...props}, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp className={cn(buttonVariants({variant, size}), className)} ref={ref} {...props} />
    );
  },
);
Button.displayName = "Button";

export {Button, buttonVariants};
