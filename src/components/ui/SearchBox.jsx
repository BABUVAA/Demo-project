// SearchBox.js
const SearchBox = ({ isOpen, toggleSearchBox }) => {
  return (
    <div className="relative">
      <button onClick={toggleSearchBox} className="text-white text-2xl">
        <i className="bx bx-search"></i>
      </button>
      <div
        className={`${
          isOpen ? "block" : "hidden"
        } absolute right-0 mt-2 bg-[#3E8DA8] rounded-lg shadow-lg w-64 p-2`}
      >
        <input
          type="text"
          className="w-full py-2 px-3 rounded-md border-none"
          placeholder="Search..."
        />
      </div>
    </div>
  );
};

export default SearchBox;
