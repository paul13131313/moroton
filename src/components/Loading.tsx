"use client";

export default function Loading() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-6">
      <div className="w-20 h-20 rounded-full bg-primary flex items-center justify-center text-4xl animate-bounce">
        👵
      </div>
      <div className="flex gap-2">
        <div className="loading-dot w-3 h-3 rounded-full bg-accent" />
        <div className="loading-dot w-3 h-3 rounded-full bg-cyan" />
        <div className="loading-dot w-3 h-3 rounded-full bg-yellow" />
      </div>
      <p className="text-primary font-bold text-lg">
        ちょっと待ちや、電卓叩いとるから…
      </p>
    </div>
  );
}
