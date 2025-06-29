
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { School, GraduationCap, Users, Building } from 'lucide-react';

interface RoleSelectionModalProps {
  open: boolean;
  onComplete: (roleData: {
    accountType: string;
    grade?: string;
    school?: string;
    subject?: string;
  }) => void;
}

const RoleSelectionModal: React.FC<RoleSelectionModalProps> = ({ open, onComplete }) => {
  const [accountType, setAccountType] = useState('');
  const [grade, setGrade] = useState('');
  const [school, setSchool] = useState('');
  const [subject, setSubject] = useState('');

  const handleComplete = () => {
    if (!accountType) return;
    
    onComplete({
      accountType,
      grade: accountType === 'student' ? grade : undefined,
      school,
      subject: accountType === 'teacher' ? subject : undefined,
    });
  };

  const isValid = accountType && (accountType !== 'student' || grade) && (accountType !== 'teacher' || subject);

  return (
    <Dialog open={open}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-center">Welcome to EduZambia! 🇿🇲</DialogTitle>
          <DialogDescription className="text-center text-lg">
            Help us personalize your learning experience by telling us about yourself.
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Account Type Selection */}
          <div className="space-y-4">
            <Label className="text-lg font-semibold">I am a:</Label>
            <RadioGroup value={accountType} onValueChange={setAccountType}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className={`cursor-pointer transition-all ${accountType === 'student' ? 'ring-2 ring-blue-500 bg-blue-50' : 'hover:bg-gray-50'}`}>
                  <CardHeader className="text-center pb-2">
                    <GraduationCap className="w-12 h-12 mx-auto text-blue-600" />
                    <CardTitle className="text-lg">Student</CardTitle>
                    <CardDescription>I'm here to learn and study</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <RadioGroupItem value="student" id="student" className="mx-auto" />
                    <Label htmlFor="student" className="sr-only">Student</Label>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer transition-all ${accountType === 'teacher' ? 'ring-2 ring-green-500 bg-green-50' : 'hover:bg-gray-50'}`}>
                  <CardHeader className="text-center pb-2">
                    <School className="w-12 h-12 mx-auto text-green-600" />
                    <CardTitle className="text-lg">Teacher</CardTitle>
                    <CardDescription>I teach and share resources</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <RadioGroupItem value="teacher" id="teacher" className="mx-auto" />
                    <Label htmlFor="teacher" className="sr-only">Teacher</Label>
                  </CardContent>
                </Card>

                <Card className={`cursor-pointer transition-all ${accountType === 'parent' ? 'ring-2 ring-purple-500 bg-purple-50' : 'hover:bg-gray-50'}`}>
                  <CardHeader className="text-center pb-2">
                    <Users className="w-12 h-12 mx-auto text-purple-600" />
                    <CardTitle className="text-lg">Parent</CardTitle>
                    <CardDescription>I support my child's education</CardDescription>
                  </CardHeader>
                  <CardContent className="text-center">
                    <RadioGroupItem value="parent" id="parent" className="mx-auto" />
                    <Label htmlFor="parent" className="sr-only">Parent</Label>
                  </CardContent>
                </Card>
              </div>
            </RadioGroup>
          </div>

          {/* Additional Information */}
          {accountType && (
            <div className="space-y-4 animate-fade-in">
              {accountType === 'student' && (
                <div className="space-y-2">
                  <Label htmlFor="grade">What grade are you in? *</Label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={`grade-${i + 1}`}>
                          Grade {i + 1}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {accountType === 'teacher' && (
                <div className="space-y-2">
                  <Label htmlFor="subject">What subject do you teach? *</Label>
                  <Select value={subject} onValueChange={setSubject}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your subject" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Mathematics">Mathematics</SelectItem>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Science">Science</SelectItem>
                      <SelectItem value="Biology">Biology</SelectItem>
                      <SelectItem value="Chemistry">Chemistry</SelectItem>
                      <SelectItem value="Physics">Physics</SelectItem>
                      <SelectItem value="History">History</SelectItem>
                      <SelectItem value="Geography">Geography</SelectItem>
                      <SelectItem value="Bemba">Bemba</SelectItem>
                      <SelectItem value="Nyanja">Nyanja</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="school">School/Institution (Optional)</Label>
                <Select value={school} onValueChange={setSchool}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select or type your school" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="University of Zambia">University of Zambia</SelectItem>
                    <SelectItem value="Copperbelt University">Copperbelt University</SelectItem>
                    <SelectItem value="Mulungushi University">Mulungushi University</SelectItem>
                    <SelectItem value="Lusaka High School">Lusaka High School</SelectItem>
                    <SelectItem value="Evelyn Hone College">Evelyn Hone College</SelectItem>
                    <SelectItem value="David Kaunda Technical High School">David Kaunda Technical High School</SelectItem>
                    <SelectItem value="Choma Secondary School">Choma Secondary School</SelectItem>
                    <SelectItem value="Kitwe Boys Secondary School">Kitwe Boys Secondary School</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <div className="flex justify-end space-x-4 pt-4">
            <Button 
              onClick={handleComplete}
              disabled={!isValid}
              className="bg-gradient-to-r from-orange-500 to-yellow-500 hover:from-orange-600 hover:to-yellow-600 px-8"
            >
              Complete Setup
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default RoleSelectionModal;
