"use client";

import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaInfoCircle, FaExclamationCircle, FaTimes } from "react-icons/fa";
import { useToast, ToastType } from "./ToastContext";

const icons: Record<ToastType, React.ReactNode> = {
  success: <FaCheckCircle className="text-green-500" size={18} />,
  info: <FaInfoCircle className="text-accent" size={18} />,
  error: <FaExclamationCircle className="text-red-500" size={18} />,
};

const backgrounds: Record<ToastType, string> = {
  success: "border-green-500/30",
  info: "border-accent/30",
  error: "border-red-500/30",
};

export default function ToastContainer() {
  const { toasts, removeToast } = useToast();

  return (
    <div className="fixed bottom-20 right-6 z-[70] flex flex-col gap-2">
      <AnimatePresence mode="popLayout">
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, x: 50, scale: 0.8 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.8 }}
            transition={{ duration: 0.2 }}
            className={`flex items-center gap-3 px-4 py-3 bg-surface border ${backgrounds[toast.type]} rounded-xl shadow-lg min-w-[200px] max-w-[320px]`}
          >
            {icons[toast.type]}
            <span className="text-sm text-text flex-1">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-text-muted hover:text-text transition-colors"
            >
              <FaTimes size={12} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
