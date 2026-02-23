"use client";

import {Button} from "@/shared/ui/button";
import {smoothScrollToId} from "@/shared/lib/utils/smooth-scroll";

type ScrollToLeadButtonProps = {
  label: string;
  className?: string;
  variant?: "primary" | "cta" | "secondary" | "ghost";
};

export function ScrollToLeadButton({
  label,
  className,
  variant = "secondary",
}: ScrollToLeadButtonProps) {
  return (
    <Button
      type="button"
      variant={variant}
      className={className}
      onClick={() => smoothScrollToId("lead-form", "center")}
    >
      {label}
    </Button>
  );
}
