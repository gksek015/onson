import ProfileDropdawn from './ProfileDropdown';

const Header = () => {
  return (
    <div>
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <div className="text-xl font-bold text-black">ON:SON</div>
        <ProfileDropdawn />
      </header>
    </div>
  );
};

export default Header;
