export const StyledNavBar = ({ showBlur, detached, children, ...props }) => {
  const baseClasses = 'flex top-0 items-center sticky h-[76px] z-[9999]';
  const blurClasses = showBlur
    ? 'bg-white/80 backdrop-saturate-180 backdrop-blur-[10px]'
    : '';
  const detachedClasses = detached
    ? 'shadow-[0px_5px_20px_-5px_rgba(2,1,1,0.1)]'
    : '';

  return (
    <nav
      className={`${baseClasses} ${blurClasses} ${detachedClasses}`}
      {...props}
    >
      {children}
    </nav>
  );
};

export const StyledMobileNavBar = ({ children, ...props }) => {
  return (
    <nav
      className="flex flex-row justify-between top-0 items-center sticky z-[9999]"
      {...props}
    >
      {children}
    </nav>
  );
};
