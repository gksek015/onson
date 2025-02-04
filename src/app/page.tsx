import MainSection from '@/app/(home)/MainSection';
import ChatBoxButton from '@/components/chatbox/ChatBoxButton';
import BottomNav from '@/components/layout/BottomNav';
import Footer from '@/components/layout/Footer';

export default function Home() {
  return (
    <section>
      <div className="mx-auto">
        <MainSection />
      </div>
      <ChatBoxButton />
      <div className="block desktop:hidden">
        <BottomNav />
      </div>
      <Footer />
    </section>
  );
}
