declare global {
  interface Window {
    ym: (...args: any[]) => void;
  }

  // Если ты вызываешь ym напрямую, без window
  function ym(...args: any[]): void;
}

export {};
