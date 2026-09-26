"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import { useRef, useState } from "react";
import { profile } from "@/content/profile";

const clicksToUnlock = 5;

export function EasterEggPortrait() {
  const router = useRouter();
  const [clicks, setClicks] = useState(0);
  const clickCount = useRef(0);

  function handleClick() {
    const nextClicks = clickCount.current + 1;
    clickCount.current = nextClicks;
    if (nextClicks >= clicksToUnlock) {
      router.push("/archive/2016/");
      return;
    }
    setClicks(nextClicks);
  }

  return (
    <button
      className={`hero__portrait-button${clicks >= 3 ? " is-awake" : ""}`}
      type="button"
      aria-label="Portrait of Dhruv Gupta"
      onClick={handleClick}
    >
      <Image
        className="hero__portrait"
        src={profile.image}
        alt=""
        width={220}
        height={220}
        priority
      />
      <span className="hero__portrait-hint" aria-hidden="true">
        {clicks === 3 ? "..." : clicks === 4 ? "one more" : ""}
      </span>
    </button>
  );
}
