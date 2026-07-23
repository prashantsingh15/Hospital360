import * as React from "react";
import { cn, hashSeed } from "@/lib/utils";

interface InitialsAvatarProps extends React.ComponentProps<"div"> {
  name: string;
}

const gradients = [
  "from-[#0F6FFF] to-[#60A5FA]",
  "from-[#0B5CE0] to-[#10B981]",
  "from-[#1E40AF] to-[#4DA3FF]",
  "from-[#059669] to-[#34D399]",
];

function getInitials(name: string): string {
  return name
    .replace(/^(Dr\.?|Prof\.?)\s+/i, "")
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

/** Gradient initials avatar — stands in for staff/patient photography. */
export function InitialsAvatar({
  name,
  className,
  ...props
}: InitialsAvatarProps) {
  const gradient = gradients[hashSeed(name) % gradients.length];

  return (
    <div
      aria-hidden
      className={cn(
        "grid shrink-0 place-items-center rounded-full bg-gradient-to-br font-display font-bold text-white",
        gradient,
        className
      )}
      {...props}
    >
      {getInitials(name)}
    </div>
  );
}
