import * as React from "react";
import { cn, hashSeed } from "@/lib/utils";

interface InitialsAvatarProps extends React.ComponentProps<"div"> {
  name: string;
  photoUrl?: string;
}

const doctorPhotoMap: Record<string, string> = {
  "Dr. Ananya Sharma": "/images/doctors/dr-ananya-sharma.jpg",
  "Dr. Vikram Malhotra": "/images/doctors/dr-vikram-malhotra.jpg",
  "Dr. Rajesh Iyer": "/images/doctors/dr-rajesh-iyer.jpg",
  "Dr. Meera Nair": "/images/doctors/dr-meera-nair.jpg",
  "Dr. Rohit Gupta": "/images/doctors/dr-rohit-gupta.jpg",
  "Dr. Priya Sen": "/images/doctors/dr-priya-sen.jpg",
  "Dr. Sunil Verma": "/images/doctors/dr-sunil-verma.jpg",
  "Dr. Kavita Reddy": "/images/doctors/dr-kavita-reddy.jpg",
  "Dr. Arjun Patel": "/images/doctors/dr-arjun-patel.jpg",
  "Dr. Shweta Bansal": "/images/doctors/dr-shweta-bansal.jpg",
  "Dr. Manish Chopra": "/images/doctors/dr-manish-chopra.jpg",
  "Dr. Pooja Joshi": "/images/doctors/dr-pooja-joshi.jpg",
};

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

/** Real doctor portrait avatar with initials fallback */
export function InitialsAvatar({
  name,
  photoUrl,
  className,
  ...props
}: InitialsAvatarProps) {
  const photo = photoUrl || doctorPhotoMap[name];

  if (photo) {
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full border border-border shadow-soft bg-surface",
          className
        )}
        {...props}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={photo}
          alt={name}
          loading="lazy"
          className="h-full w-full object-cover"
        />
      </div>
    );
  }

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
