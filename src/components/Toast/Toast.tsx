import { useEffect } from 'react';

export interface ToastProps {
  id: string;
  message: string;
  type?: 'success' | 'error' | 'info' | 'warning';
  duration?: number;
  onClose: (id: string) => void;
}

const Toast = ({
  id,
  message,
  type = 'success',
  duration = 3000,
  onClose,
}: ToastProps) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose(id);
    }, duration);

    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  const getToastStyles = () => {
    const baseStyles =
      'fixed top-4 right-4 z-50 max-w-sm w-full bg-zinc-800 border rounded-lg shadow-lg transform transition-all duration-300 ease-in-out';

    switch (type) {
      case 'success':
        return `${baseStyles} border-green-500 text-green-100`;
      case 'error':
        return `${baseStyles} border-red-500 text-red-100`;
      case 'warning':
        return `${baseStyles} border-yellow-500 text-yellow-100`;
      case 'info':
        return `${baseStyles} border-blue-500 text-blue-100`;
      default:
        return `${baseStyles} border-zinc-600 text-zinc-100`;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✓';
      case 'error':
        return '✕';
      case 'warning':
        return '⚠';
      case 'info':
        return 'ℹ';
      default:
        return '✓';
    }
  };

  return (
    <div className={getToastStyles()}>
      <div className="flex items-center p-4">
        <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full bg-current bg-opacity-20 mr-3">
          <span className="text-sm font-bold">{getIcon()}</span>
        </div>
        <div className="flex-1">
          <p className="text-sm font-medium">{message}</p>
        </div>
        <button
          onClick={() => onClose(id)}
          className="ml-3 flex-shrink-0 text-current opacity-70 hover:opacity-100 transition-opacity"
          aria-label="Close notification"
        >
          <span className="text-lg">×</span>
        </button>
      </div>
    </div>
  );
};

export default Toast;
