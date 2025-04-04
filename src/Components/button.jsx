export function Button({ children, className = '', ...props }) {
    return (
      <button
        className={`bg-[#a47c48] text-white px-4 py-2 rounded-xl hover:opacity-90 transition ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  }
  