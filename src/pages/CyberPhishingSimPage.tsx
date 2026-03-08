import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Mail, AlertTriangle, CheckCircle, RotateCcw } from 'lucide-react';
import { motion } from 'framer-motion';

const EMAILS = [
  { from: 'security@bank0fzambia.com', subject: 'Urgent: Verify Your Account', body: 'Dear customer, your account has been compromised. Click here immediately to verify: http://bank0fzambia-verify.tk/login', isPhishing: true, clue: 'Misspelled domain (bank0fzambia with zero), suspicious TLD (.tk), urgency tactics' },
  { from: 'admin@school.edu.zm', subject: 'Exam Timetable Released', body: 'Dear student, the exam timetable for Term 2 has been released. Please check the school portal for details.', isPhishing: false, clue: 'Legitimate .edu.zm domain, no links, no urgency' },
  { from: 'support@netflix-account.com', subject: 'Payment Failed - Update Now', body: 'Your Netflix payment failed. Update your credit card at: http://netflix-account.com/update-payment', isPhishing: true, clue: 'Not official Netflix domain, requests payment info via email' },
  { from: 'hr@company.co.zm', subject: 'Staff Meeting Tomorrow', body: 'Reminder: All-hands meeting tomorrow at 10 AM in the conference room. Agenda attached.', isPhishing: false, clue: 'Internal communication, no suspicious links' },
  { from: 'winner@lottery-intl.org', subject: 'You Won $1,000,000!', body: 'Congratulations! You have been selected as our grand prize winner. Send your bank details to claim.', isPhishing: true, clue: 'Lottery scam, requests bank details, too good to be true' },
  { from: 'noreply@airtel.co.zm', subject: 'Airtel Money Statement', body: 'Your monthly Airtel Money statement is ready. Log in to the Airtel app to view.', isPhishing: false, clue: 'Legitimate domain, no links embedded, routine notification' },
  { from: 'ceo@yourcompany-hr.com', subject: 'Wire Transfer Needed ASAP', body: 'I need you to process an urgent wire transfer. Cannot discuss on phone. Send to account ending 4521.', isPhishing: true, clue: 'CEO fraud/BEC attack, urgency, unusual request via email' },
  { from: 'it@university.edu.zm', subject: 'Password Expiry Notice', body: 'Your university password will expire in 30 days. Visit the IT portal to update it.', isPhishing: false, clue: 'Legitimate domain, standard IT notification' },
];

const CyberPhishingSimPage = () => {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [answered, setAnswered] = useState<boolean | null>(null);
  const [done, setDone] = useState(false);

  const email = EMAILS[current];

  const answer = (isPhishing: boolean) => {
    const correct = isPhishing === email.isPhishing;
    if (correct) setScore(score + 1);
    setAnswered(correct);
  };

  const next = () => {
    if (current + 1 >= EMAILS.length) { setDone(true); return; }
    setCurrent(current + 1); setAnswered(null);
  };

  const restart = () => { setCurrent(0); setScore(0); setAnswered(null); setDone(false); };

  if (done) return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      <h1 className="text-2xl font-bold flex items-center gap-2"><Mail className="w-6 h-6 text-primary" /> Phishing Simulator</h1>
      <Card><CardContent className="p-8 text-center space-y-4">
        <p className="text-5xl font-bold text-primary">{score}/{EMAILS.length}</p>
        <p className="text-lg font-medium">{score >= 7 ? 'Excellent! You\'re phishing-proof! 🛡️' : score >= 5 ? 'Good awareness! Keep learning.' : 'Practice more to improve your detection skills.'}</p>
        <Progress value={(score / EMAILS.length) * 100} className="h-3" />
        <Button onClick={restart}><RotateCcw className="w-4 h-4 mr-2" />Try Again</Button>
      </CardContent></Card>
    </div>
  );

  return (
    <div className="max-w-lg mx-auto py-6 px-4 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold flex items-center gap-2"><Mail className="w-6 h-6 text-primary" /> Phishing Simulator</h1>
        <Badge variant="outline">{current + 1}/{EMAILS.length}</Badge>
      </div>

      <motion.div key={current} initial={{ x: 30, opacity: 0 }} animate={{ x: 0, opacity: 1 }}>
        <Card className="border-border">
          <CardContent className="p-5 space-y-3">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">From: <span className="font-mono">{email.from}</span></p>
              <p className="font-medium">{email.subject}</p>
            </div>
            <div className="bg-muted/30 p-3 rounded text-sm">{email.body}</div>

            {answered === null ? (
              <div className="flex gap-3">
                <Button className="flex-1 bg-destructive hover:bg-destructive/90" onClick={() => answer(true)}>
                  <AlertTriangle className="w-4 h-4 mr-2" />Phishing
                </Button>
                <Button className="flex-1" variant="outline" onClick={() => answer(false)}>
                  <CheckCircle className="w-4 h-4 mr-2" />Legitimate
                </Button>
              </div>
            ) : (
              <div className={`p-3 rounded ${answered ? 'bg-green-500/10 border border-green-500/30' : 'bg-destructive/10 border border-destructive/30'}`}>
                <p className="font-medium text-sm">{answered ? '✅ Correct!' : '❌ Wrong!'}</p>
                <p className="text-xs text-muted-foreground mt-1">This email is <strong>{email.isPhishing ? 'PHISHING' : 'LEGITIMATE'}</strong>.</p>
                <p className="text-xs text-muted-foreground mt-1">Clue: {email.clue}</p>
                <Button size="sm" className="mt-2" onClick={next}>Next Email</Button>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>

      <Progress value={(current / EMAILS.length) * 100} className="h-1" />
    </div>
  );
};

export default CyberPhishingSimPage;
