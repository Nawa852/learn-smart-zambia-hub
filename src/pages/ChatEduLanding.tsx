import { 
  ChatEduNavbar,
  ChatEduHero, 
  ChatEduFeatures, 
  ChatEduRoles,
  ChatEduTestimonials,
  ChatEduPricing,
  ChatEduCTA,
  ChatEduFooter 
} from '@/components/ChatEdu';

const ChatEduLanding = () => {
  return (
    <div className="min-h-screen bg-background">
      <ChatEduNavbar />
      <ChatEduHero />
      <ChatEduFeatures />
      <ChatEduRoles />
      <ChatEduTestimonials />
      <ChatEduPricing />
      <ChatEduCTA />
      <ChatEduFooter />
    </div>
  );
};

export default ChatEduLanding;
