import ChatIcon from './header/ChatIcon';
import HeaderLogo from './header/HeaderLogo';
import IsLogin from './header/IsLogin';
import LeftSide from './header/LeftSide';

const Header = () => {
  return (
    <header className="flex h-[56px] justify-center bg-white px-[20px] py-[8px]">
      <div className="flex w-full max-w-content items-center justify-between">
        <div className="flex flex-row items-center gap-6">
          <HeaderLogo />
          <LeftSide />
        </div>
        <div className="flex flex-row items-center gap-6">
          <ChatIcon />
          <IsLogin />
        </div>
      </div>
    </header>
  );
};

export default Header;
