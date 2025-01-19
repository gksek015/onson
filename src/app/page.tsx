import InitializeUser from '@/components/auth/InitializeUser';
import ChatBoxButton from '@/components/chatbox/ChatBoxButton';
import MainSection from '@/components/home/MainSection';
import Header from '@/components/layout/Header';

export default function Home() {
  return (
    <section>
      <InitializeUser />
      <Header />
      <div className="mb-20 mt-5">
        <MainSection />
      </div>
      <div>
        <ChatBoxButton />
      </div>
    </section>
  );
}
