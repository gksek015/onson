import ChatBoxButton from '@/components/chatbox/ChatBoxButton';
import MainPage from '@/components/home/MainPage';

export default function Home() {
  return (
    <section>
      <MainPage />
      <div>
        <ChatBoxButton />
      </div>
    </section>
  );
}
