import InitializeUser from '@/components/auth/InitializeUser';
import ChatBoxButton from '@/components/chatbox/ChatBoxButton';
import MainSection from '@/components/home/MainSection';
import BottomNav from '@/components/layout/BottomNav';
import Header from '@/components/layout/Header';

export default function Home() {
  return (
    <section>
      <InitializeUser />
      <Header />
      <div className="mx-auto mb-20 mt-5 max-w-content">
        <MainSection />
      </div>
      <div>
        <ChatBoxButton />
      </div>
      <div className="block sm:hidden">
        <BottomNav />
      </div>
    </section>
  );
}
