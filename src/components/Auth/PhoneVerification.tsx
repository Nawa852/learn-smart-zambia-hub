
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Phone, MessageSquare } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { useToast } from '@/components/ui/use-toast';

const PhoneVerification = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const { sendSMSVerification, verifyPhone } = useAuth();
  const { toast } = useToast();

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber.trim()) {
      toast({
        title: "Phone Number Required",
        description: "Please enter your phone number",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await sendSMSVerification(phoneNumber);
      setIsCodeSent(true);
    } catch (error) {
      console.error('SMS sending failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!verificationCode.trim()) {
      toast({
        title: "Verification Code Required",
        description: "Please enter the verification code",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      await verifyPhone(phoneNumber, verificationCode);
      setIsCodeSent(false);
      setPhoneNumber('');
      setVerificationCode('');
    } catch (error) {
      console.error('Phone verification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center">
            <Phone className="w-8 h-8 text-white" />
          </div>
        </div>
        <CardTitle className="text-2xl font-bold">Phone Verification</CardTitle>
        <CardDescription>
          {!isCodeSent 
            ? "Enter your phone number to receive a verification code"
            : "Enter the verification code sent to your phone"
          }
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {!isCodeSent ? (
          <form onSubmit={handleSendCode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="phoneNumber">Phone Number</Label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="phoneNumber"
                  type="tel"
                  placeholder="+260 XXX XXX XXX"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              disabled={loading}
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </Button>
          </form>
        ) : (
          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="verificationCode">Verification Code</Label>
              <div className="relative">
                <MessageSquare className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="verificationCode"
                  type="text"
                  placeholder="Enter 6-digit code"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  className="pl-10"
                  maxLength={6}
                  required
                />
              </div>
            </div>
            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700"
              disabled={loading}
            >
              {loading ? 'Verifying...' : 'Verify Phone Number'}
            </Button>
            <Button 
              type="button" 
              variant="outline"
              className="w-full"
              onClick={() => {
                setIsCodeSent(false);
                setVerificationCode('');
              }}
            >
              Change Phone Number
            </Button>
          </form>
        )}
      </CardContent>
    </Card>
  );
};

export default PhoneVerification;
