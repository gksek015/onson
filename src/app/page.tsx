import ChatBoxButton from '@/components/chatbox/ChatBoxButton';
import MainSection from '@/components/home/MainSection';
import Header from '@/components/layout/Header';

export default function Home() {
  return (
    <section>
      <Header />
      <div className='mt-5'>
        <MainSection />
      </div>
      <div>
        <ChatBoxButton />
      </div>
    </section>
  );
}
