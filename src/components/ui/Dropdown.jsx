// Dropdown.js
const Dropdown = ({ label, children }) => {
  return (
    <div className="relative">
      <button className="flex items-center text-white text-sm font-medium hover:text-gray-200">
        {label} <i className="bx bx-chevron-down ml-1"></i>
      </button>
      <ul className="absolute left-0 hidden mt-2 bg-[#3E8DA8] shadow-lg rounded-md w-48 text-sm">
        {children}
      </ul>
    </div>
  );
};

export default Dropdown;
