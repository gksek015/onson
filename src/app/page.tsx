import MainSection from '@/app/(home)/MainSection';
import ChatBoxButton from '@/components/chatbox/ChatBoxButton';
import BottomNav from '@/components/layout/BottomNav';
import Header from '@/components/layout/Header';

export default function Home() {
  return (
    <section>
      <Header />
      <div className="mx-auto mb-20 max-w-content">
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
