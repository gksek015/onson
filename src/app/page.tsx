import ChatBoxButton from '@/components/chatbox/ChatBoxButton';
import MainSection from '@/components/home/MainSection';

export default function Home() {
  return (
    <section>
      <MainSection />
      <div>
        <ChatBoxButton />
      </div>
    </section>
  );
}
