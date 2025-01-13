import ChatBoxButton from '@/components/chatbox/ChatBoxButton';
import MainPage from '@/components/home/MainPage';
import Header from '@/components/layout/Header';

export default function Home() {
  return (
    <section>
      <Header/>
      <MainPage />
      <div>
        <ChatBoxButton />
      </div>
    </section>
  );
}
