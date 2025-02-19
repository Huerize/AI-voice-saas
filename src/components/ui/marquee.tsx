
import React from "react";
import { cn } from "@/lib/utils";

interface MarqueeProps {
  className?: string;
  pauseOnHover?: boolean;
  direction?: "normal" | "reverse";
  speed?: "fast" | "normal" | "slow";
  fade?: boolean;
}

const Marquee = ({
  className,
  pauseOnHover = true,
  direction = "normal",
  speed = "normal",
  fade = true,
}: MarqueeProps) => {
  const speedMap = {
    fast: "40s",
    normal: "60s",
    slow: "80s",
  };

  return (
    <div className={cn("relative w-full overflow-hidden", className)}>
      {fade && (
        <>
          <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-[100px] bg-gradient-to-r from-background to-transparent" />
          <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-[100px] bg-gradient-to-l from-background to-transparent" />
        </>
      )}
      <div
        className={cn(
          "flex min-w-full shrink-0 gap-16 py-4",
          pauseOnHover && "hover:[animation-play-state:paused]"
        )}
        style={{
          animation: `scroll ${speedMap[speed]} linear infinite ${
            direction === "reverse" ? "reverse" : ""
          }`,
        }}
      >
        <div className="flex min-w-full shrink-0 items-center justify-around gap-16">
          {/* First set of logos */}
          <img src="/logos/elevenlabs.svg" alt="ElevenLabs" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
          <img src="/logos/deepgram.svg" alt="Deepgram" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
          <img src="/logos/microsoft.svg" alt="Microsoft" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
          <img src="/logos/openai.svg" alt="OpenAI" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
        </div>
        <div className="flex min-w-full shrink-0 items-center justify-around gap-16">
          {/* Duplicate set for seamless scrolling */}
          <img src="/logos/elevenlabs.svg" alt="ElevenLabs" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
          <img src="/logos/deepgram.svg" alt="Deepgram" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
          <img src="/logos/microsoft.svg" alt="Microsoft" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
          <img src="/logos/openai.svg" alt="OpenAI" className="h-8 opacity-70 hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </div>
  );
};

export default Marquee;
