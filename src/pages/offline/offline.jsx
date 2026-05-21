import { useState, useEffect } from "react";

function OfflinePage() {
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => setIsOnline(true);
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);

    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  if (isOnline) return null;

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center overflow-hidden">
      <div
        style={{
          width: 72,
          height: 72,
          borderRadius: "50%",
          backgroundColor: "#fee2e2",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 24,
        }}
      >
        <svg
          width="36"
          height="36"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ef4444"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="1" y1="1" x2="23" y2="23" />
          <path d="M16.72 11.06A10.94 10.94 0 0 1 19 12.55" />
          <path d="M5 12.55a10.94 10.94 0 0 1 5.17-2.39" />
          <path d="M10.71 5.05A16 16 0 0 1 22.56 9" />
          <path d="M1.42 9a15.91 15.91 0 0 1 4.7-2.88" />
          <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
          <line x1="12" y1="20" x2="12.01" y2="20" />
        </svg>
      </div>

      <h1 className="text-black text-2xl font-semibold mb-2">
        Nimadir buzilib qoldi
      </h1>
      <p className="max-w-80 mb-7 text-foreground text-base text-center leading-[120%]">
        Internetni tekshiring va sahifani qaytadan yuklang — odatda bu yordam
        beradi
      </p>

      <button
        className="text-base text-white font-medium py-2.5 px-8 bg-primary rounded-xl"
        onClick={() => window.location.reload()}
      >
        Qaytadan yuklash
      </button>
    </div>
  );
}

export default OfflinePage;
