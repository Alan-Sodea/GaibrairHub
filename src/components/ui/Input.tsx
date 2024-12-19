import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  error?: string;
}

export const Input = ({ icon, error, className = '', ...props }: InputProps) => {
  return (
    <div className="space-y-1">
      <div className="relative">
        {icon && (
          <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>
        )}
        <input
          className={`w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-900 
            placeholder-gray-500 transition-colors focus:border-indigo-500 focus:outline-none
            focus:ring-1 focus:ring-indigo-500 dark:border-gray-600 dark:bg-gray-800 
            dark:text-white dark:placeholder-gray-400 ${icon ? 'pl-10' : ''} ${className}`}
          {...props}
        />
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};