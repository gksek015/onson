import ChatBoxButton from '@/components/chatbox/ChatBoxButton';
import MainSection from '@/components/home/MainSection';
import Header from '@/components/layout/Header';

export default function Home() {
  return (
    <section>
      <Header />
      <MainSection />
      <div>
        <ChatBoxButton />
      </div>
    </section>
  );
}
