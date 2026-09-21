import React, { createContext, useContext, useState, useEffect, useCallback, useRef, ReactNode } from 'react';
import { GlobalLoadingOverlay } from '../components/GlobalLoadingOverlay';

// Singleton event tracker so any service (e.g. storage.ts, cmsService.ts, API calls) can trigger loading
class LoadingTracker {
  private count = 0;
  private currentMessage = 'Đang đồng bộ dữ liệu...';
  private listeners = new Set<() => void>();

  public getState() {
    return {
      isLoading: this.count > 0,
      activeCount: this.count,
      message: this.currentMessage,
    };
  }

  public subscribe(listener: () => void) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  private notify() {
    this.listeners.forEach((listener) => {
      try {
        listener();
      } catch (err) {
        console.error('LoadingTracker listener error:', err);
      }
    });
  }

  public start(message?: string): () => void {
    this.count++;
    if (message) {
      this.currentMessage = message;
    }
    this.notify();

    let stopped = false;
    return () => {
      if (!stopped) {
        stopped = true;
        this.stop();
      }
    };
  }

  public stop(): void {
    this.count = Math.max(0, this.count - 1);
    if (this.count === 0) {
      this.currentMessage = 'Đang đồng bộ dữ liệu...';
    }
    this.notify();
  }

  public async track<T>(promise: Promise<T>, message?: string): Promise<T> {
    const stopFn = this.start(message);
    try {
      return await promise;
    } finally {
      stopFn();
    }
  }
}

export const loadingTracker = new LoadingTracker();

interface LoadingContextType {
  isLoading: boolean;
  message: string;
  startLoading: (message?: string) => () => void;
  stopLoading: () => void;
  withLoading: <T>(promise: Promise<T>, message?: string) => Promise<T>;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export function useLoading() {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
}

interface LoadingProviderProps {
  children: ReactNode;
}

export function LoadingProvider({ children }: LoadingProviderProps) {
  const [state, setState] = useState(() => loadingTracker.getState());
  const [isOverlayVisible, setIsOverlayVisible] = useState(false);
  const minDurationTimerRef = useRef<NodeJS.Timeout | null>(null);
  const showTimerRef = useRef<NodeJS.Timeout | null>(null);
  const shownAtRef = useRef<number>(0);

  useEffect(() => {
    const unsubscribe = loadingTracker.subscribe(() => {
      const newState = loadingTracker.getState();
      setState(newState);

      if (newState.isLoading) {
        // Clear any pending hide timer
        if (minDurationTimerRef.current) {
          clearTimeout(minDurationTimerRef.current);
          minDurationTimerRef.current = null;
        }

        // Show overlay with a micro-threshold (40ms) to avoid flicker on instantaneous cache reads
        if (!showTimerRef.current && !isOverlayVisible) {
          showTimerRef.current = setTimeout(() => {
            setIsOverlayVisible(true);
            shownAtRef.current = Date.now();
            showTimerRef.current = null;
          }, 40);
        }
      } else {
        // Cancel pending show timer if fetch completed before threshold
        if (showTimerRef.current) {
          clearTimeout(showTimerRef.current);
          showTimerRef.current = null;
        }

        if (isOverlayVisible) {
          // Keep overlay visible for a minimum of 280ms to allow smooth framer-motion transitions
          const elapsed = Date.now() - shownAtRef.current;
          const remaining = Math.max(0, 280 - elapsed);

          if (minDurationTimerRef.current) {
            clearTimeout(minDurationTimerRef.current);
          }

          minDurationTimerRef.current = setTimeout(() => {
            setIsOverlayVisible(false);
            minDurationTimerRef.current = null;
          }, remaining);
        }
      }
    });

    return () => {
      unsubscribe();
      if (minDurationTimerRef.current) clearTimeout(minDurationTimerRef.current);
      if (showTimerRef.current) clearTimeout(showTimerRef.current);
    };
  }, [isOverlayVisible]);

  const startLoading = useCallback((message?: string) => {
    return loadingTracker.start(message);
  }, []);

  const stopLoading = useCallback(() => {
    loadingTracker.stop();
  }, []);

  const withLoading = useCallback(<T,>(promise: Promise<T>, message?: string): Promise<T> => {
    return loadingTracker.track(promise, message);
  }, []);

  return (
    <LoadingContext.Provider
      value={{
        isLoading: isOverlayVisible,
        message: state.message,
        startLoading,
        stopLoading,
        withLoading,
      }}
    >
      {children}
      <GlobalLoadingOverlay isLoading={isOverlayVisible} message={state.message} />
    </LoadingContext.Provider>
  );
}
