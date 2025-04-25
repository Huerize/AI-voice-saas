
// Web Audio API type declarations
interface Window {
  AudioContext: typeof AudioContext;
  webkitAudioContext: typeof AudioContext;
}

// Additional declarations for MediaRecorder API
interface MediaRecorderErrorEvent extends Event {
  name: string;
}

interface MediaRecorderDataAvailableEvent extends Event {
  data: Blob;
}

interface MediaRecorderOptions {
  mimeType?: string;
  audioBitsPerSecond?: number;
  videoBitsPerSecond?: number;
  bitsPerSecond?: number;
}

interface MediaRecorderEventMap {
  'dataavailable': MediaRecorderDataAvailableEvent;
  'error': MediaRecorderErrorEvent;
  'pause': Event;
  'resume': Event;
  'start': Event;
  'stop': Event;
}

interface MediaRecorder extends EventTarget {
  readonly state: 'inactive' | 'recording' | 'paused';
  readonly stream: MediaStream;
  readonly mimeType: string;
  readonly audioBitsPerSecond: number;
  readonly videoBitsPerSecond: number;
  
  ondataavailable: ((event: MediaRecorderDataAvailableEvent) => void) | null;
  onerror: ((event: MediaRecorderErrorEvent) => void) | null;
  onpause: ((event: Event) => void) | null;
  onresume: ((event: Event) => void) | null;
  onstart: ((event: Event) => void) | null;
  onstop: ((event: Event) => void) | null;
  
  start(timeslice?: number): void;
  stop(): void;
  pause(): void;
  resume(): void;
  requestData(): void;
  
  addEventListener<K extends keyof MediaRecorderEventMap>(
    type: K,
    listener: (this: MediaRecorder, ev: MediaRecorderEventMap[K]) => any,
    options?: boolean | AddEventListenerOptions
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions
  ): void;
  removeEventListener<K extends keyof MediaRecorderEventMap>(
    type: K,
    listener: (this: MediaRecorder, ev: MediaRecorderEventMap[K]) => any,
    options?: boolean | EventListenerOptions
  ): void;
  removeEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | EventListenerOptions
  ): void;
}

interface MediaRecorderConstructor {
  new(stream: MediaStream, options?: MediaRecorderOptions): MediaRecorder;
  isTypeSupported(mimeType: string): boolean;
}

declare var MediaRecorder: MediaRecorderConstructor;
