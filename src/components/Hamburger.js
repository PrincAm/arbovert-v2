'use client';

const Hamburger = ({ toggle, isExpanded, ...props }) => {
  return (
    <button
      type="button"
      onClick={toggle}
      className="relative w-6 h-6 flex flex-col justify-center items-center cursor-pointer z-10 mr-6"
      aria-label="Toggle menu"
      {...props}
    >
      <span
        className={`block absolute w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
          isExpanded ? 'rotate-45 translate-y-0' : '-translate-y-2'
        }`}
      />
      <span
        className={`block absolute w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
          isExpanded ? 'opacity-0' : 'opacity-100'
        }`}
      />
      <span
        className={`block absolute w-6 h-0.5 bg-current transition-all duration-300 ease-in-out ${
          isExpanded ? '-rotate-45 translate-y-0' : 'translate-y-2'
        }`}
      />
    </button>
  );
};

export default Hamburger;
