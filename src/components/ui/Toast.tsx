'use client';

import React, { useState, useEffect, createContext, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

// Toast types and interfaces
type ToastType = 'success' | 'error' | 'warning' | 'info';

interface Toast {
  id: string;
  type: ToastType;
  title: string;
  message?: string;
  duration?: number;
  action?: {
    label: string;
    onClick: () => void;
  };
}

interface ToastContextType {
  showToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

// Toast Context
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Toast Provider Component
export function ToastProvider({ children }: { children: React.ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (toast: Omit<Toast, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    const newToast: Toast = {
      id,
      duration: 5000, // Default 5 seconds
      ...toast,
    };

    setToasts(prev => [...prev, newToast]);

    // Auto-remove toast after duration
    if (newToast.duration) {
      setTimeout(() => {
        removeToast(id);
      }, newToast.duration);
    }
  };

  const removeToast = (id: string) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <ToastContext.Provider value={{ showToast, removeToast }}>
      {children}
      <ToastContainer toasts={toasts} onRemove={removeToast} />
    </ToastContext.Provider>
  );
}

// Toast Container Component
function ToastContainer({ toasts, onRemove }: { toasts: Toast[]; onRemove: (id: string) => void }) {
  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <ToastItem key={toast.id} toast={toast} onRemove={onRemove} />
        ))}
      </AnimatePresence>
    </div>
  );
}

// Individual Toast Item Component
function ToastItem({ toast, onRemove }: { toast: Toast; onRemove: (id: string) => void }) {
  const getToastStyles = (type: ToastType) => {
    switch (type) {
      case 'success':
        return {
          bg: 'bg-green-500/90',
          border: 'border-green-400',
          icon: <CheckCircle className="w-5 h-5 text-green-300" />,
          iconBg: 'bg-green-400/20'
        };
      case 'error':
        return {
          bg: 'bg-red-500/90',
          border: 'border-red-400',
          icon: <XCircle className="w-5 h-5 text-red-300" />,
          iconBg: 'bg-red-400/20'
        };
      case 'warning':
        return {
          bg: 'bg-yellow-500/90',
          border: 'border-yellow-400',
          icon: <AlertCircle className="w-5 h-5 text-yellow-300" />,
          iconBg: 'bg-yellow-400/20'
        };
      case 'info':
        return {
          bg: 'bg-blue-500/90',
          border: 'border-blue-400',
          icon: <Info className="w-5 h-5 text-blue-300" />,
          iconBg: 'bg-blue-400/20'
        };
    }
  };

  const styles = getToastStyles(toast.type);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: -50, scale: 0.5, transition: { duration: 0.2 } }}
      className={`${styles.bg} ${styles.border} backdrop-blur-sm border rounded-lg p-4 shadow-lg max-w-sm`}
    >
      <div className="flex items-start gap-3">
        {/* Icon */}
        <div className={`${styles.iconBg} rounded-full p-1 flex-shrink-0`}>
          {styles.icon}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-white text-sm mb-1">{toast.title}</h4>
          {toast.message && (
            <p className="text-white/80 text-xs leading-relaxed">{toast.message}</p>
          )}
          
          {/* Action Button */}
          {toast.action && (
            <button
              onClick={toast.action.onClick}
              className="mt-2 text-xs font-medium text-white hover:text-white/80 underline transition-colors"
            >
              {toast.action.label}
            </button>
          )}
        </div>

        {/* Close Button */}
        <button
          onClick={() => onRemove(toast.id)}
          className="text-white/60 hover:text-white transition-colors flex-shrink-0"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
}

// Custom hook to use toast
export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

// Convenience methods
export const toast = {
  success: (title: string, message?: string, options?: Partial<Toast>) => {
    if (typeof window !== 'undefined' && window.toastProvider) {
      window.toastProvider.showToast({ type: 'success', title, message, ...options });
    }
  },
  error: (title: string, message?: string, options?: Partial<Toast>) => {
    if (typeof window !== 'undefined' && window.toastProvider) {
      window.toastProvider.showToast({ type: 'error', title, message, ...options });
    }
  },
  warning: (title: string, message?: string, options?: Partial<Toast>) => {
    if (typeof window !== 'undefined' && window.toastProvider) {
      window.toastProvider.showToast({ type: 'warning', title, message, ...options });
    }
  },
  info: (title: string, message?: string, options?: Partial<Toast>) => {
    if (typeof window !== 'undefined' && window.toastProvider) {
      window.toastProvider.showToast({ type: 'info', title, message, ...options });
    }
  }
};

// Global toast provider setup
declare global {
  interface Window {
    toastProvider?: ToastContextType;
  }
}