import MainSection from '@/app/(home)/MainSection';
import ChatBoxButton from '@/components/chatbox/ChatBoxButton';
import BottomNav from '@/components/layout/BottomNav';

export default function Home() {
  return (
    <section>
      <div className="mx-auto">
        <MainSection />
      </div>
      <div>
        <ChatBoxButton />
      </div>
      <div className="block desktop:hidden">
        <BottomNav />
      </div>
    </section>
  );
}
