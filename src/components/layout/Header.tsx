const Header = () => {
  return (
    <div>
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-black">ON:SON</div>
        <div className="relative w-10 h-10">
          <img
            src="https://via.placeholder.com/40"
            alt="Profile"
            className="w-10 h-10 rounded-full object-cover border border-gray-300"
          />
        </div>
      </header>
    </div>
  );
};

export default Header;
