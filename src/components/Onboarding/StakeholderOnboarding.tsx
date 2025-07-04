
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { GraduationCap, Users, BookOpen, Heart, Building } from 'lucide-react';
import { useAuth } from '@/components/Auth/AuthProvider';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface StakeholderOnboardingProps {
  onComplete: () => void;
}

const StakeholderOnboarding = ({ onComplete }: StakeholderOnboardingProps) => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    userType: '',
    fullName: '',
    phoneNumber: '',
    parentPhone: '',
    parentEmail: '',
    studentEmail: '',
    grade: '',
    school: '',
    subjects: [] as string[],
    emergencyContact: '',
    address: '',
    goals: '',
    interests: [] as string[],
    learningStyle: '',
    availability: '',
    experience: '',
    specialization: ''
  });

  const stakeholderTypes = [
    { value: 'student', label: 'Student', icon: GraduationCap, description: 'I am a student looking to learn' },
    { value: 'parent', label: 'Parent/Guardian', icon: Heart, description: 'I am a parent supporting my child\'s education' },
    { value: 'teacher', label: 'Teacher', icon: BookOpen, description: 'I am an educator' },
    { value: 'administrator', label: 'School Administrator', icon: Building, description: 'I manage an educational institution' },
    { value: 'community_leader', label: 'Community Leader', icon: Users, description: 'I support community education initiatives' }
  ];

  const zambianSubjects = [
    'Mathematics', 'English', 'Science', 'Social Studies', 'Bemba', 'Nyanja', 
    'Tonga', 'Lozi', 'History', 'Geography', 'Civic Education', 'Religious Education'
  ];

  const learningStyles = [
    { value: 'visual', label: 'Visual Learner' },
    { value: 'auditory', label: 'Auditory Learner' },
    { value: 'kinesthetic', label: 'Hands-on Learner' },
    { value: 'mixed', label: 'Mixed Learning Style' }
  ];

  const handleNext = () => {
    if (step < 3) setStep(step + 1);
  };

  const handleBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const handleComplete = async () => {
    if (!user) return;

    setLoading(true);
    try {
      // Update the profiles table with onboarding data
      const { error } = await supabase
        .from('profiles')
        .update({
          user_type: formData.userType,
          full_name: formData.fullName,
          phone_number: formData.phoneNumber,
          updated_at: new Date().toISOString()
        })
        .eq('id', user.id);

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }

      // Create additional stakeholder-specific records if needed
      if (formData.userType === 'student' && formData.parentPhone) {
        // Store parent contact information
        await supabase
          .from('user_preferences')
          .update({
            preferences: {
              parent_phone: formData.parentPhone,
              parent_email: formData.parentEmail,
              grade: formData.grade,
              school: formData.school,
              subjects: formData.subjects,
              learning_style: formData.learningStyle,
              goals: formData.goals
            }
          })
          .eq('user_id', user.id);
      }

      toast({
        title: "Onboarding Complete!",
        description: "Welcome to EDU ZAMBIA AI Platform",
      });

      onComplete();
    } catch (error) {
      console.error('Onboarding error:', error);
      toast({
        title: "Error",
        description: "Failed to complete onboarding. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const renderStakeholderSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Welcome to EDU ZAMBIA AI</h2>
        <p className="text-gray-600">Let's set up your account. What describes you best?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stakeholderTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <Card 
              key={type.value} 
              className={`cursor-pointer hover:shadow-lg transition-all ${
                formData.userType === type.value ? 'ring-2 ring-blue-500 bg-blue-50' : ''
              }`}
              onClick={() => setFormData({ ...formData, userType: type.value })}
            >
              <CardContent className="p-6 text-center">
                <IconComponent className="w-12 h-12 mx-auto mb-4 text-blue-600" />
                <h3 className="font-semibold text-lg mb-2">{type.label}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderPersonalInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Personal Information</h2>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label htmlFor="fullName">Full Name *</Label>
          <Input
            id="fullName"
            value={formData.fullName}
            onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
            placeholder="Enter your full name"
            required
          />
        </div>
        
        <div>
          <Label htmlFor="phoneNumber">Phone Number *</Label>
          <Input
            id="phoneNumber"
            value={formData.phoneNumber}
            onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
            placeholder="+260 XXX XXX XXX"
            required
          />
        </div>
        
        {formData.userType === 'student' && (
          <>
            <div>
              <Label htmlFor="parentPhone">Parent/Guardian Phone</Label>
              <Input
                id="parentPhone"
                value={formData.parentPhone}
                onChange={(e) => setFormData({ ...formData, parentPhone: e.target.value })}
                placeholder="+260 XXX XXX XXX"
              />
            </div>
            
            <div>
              <Label htmlFor="parentEmail">Parent/Guardian Email</Label>
              <Input
                id="parentEmail"
                type="email"
                value={formData.parentEmail}
                onChange={(e) => setFormData({ ...formData, parentEmail: e.target.value })}
                placeholder="parent@example.com"
              />
            </div>
            
            <div>
              <Label htmlFor="grade">Grade Level</Label>
              <Select value={formData.grade} onValueChange={(value) => setFormData({ ...formData, grade: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select your grade" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 12 }, (_, i) => i + 1).map((grade) => (
                    <SelectItem key={grade} value={`Grade ${grade}`}>
                      Grade {grade}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label htmlFor="school">School Name</Label>
              <Input
                id="school"
                value={formData.school}
                onChange={(e) => setFormData({ ...formData, school: e.target.value })}
                placeholder="Your school name"
              />
            </div>
          </>
        )}
        
        {formData.userType === 'parent' && (
          <div>
            <Label htmlFor="studentEmail">Student's Email (if applicable)</Label>
            <Input
              id="studentEmail"
              type="email"
              value={formData.studentEmail}
              onChange={(e) => setFormData({ ...formData, studentEmail: e.target.value })}
              placeholder="student@example.com"
            />
          </div>
        )}
      </div>
    </div>
  );

  const renderPreferences = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Learning Preferences</h2>
        <p className="text-gray-600">Help us personalize your experience</p>
      </div>
      
      <div className="space-y-6">
        {(formData.userType === 'student' || formData.userType === 'teacher') && (
          <div>
            <Label>Preferred Subjects</Label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2 mt-2">
              {zambianSubjects.map((subject) => (
                <label key={subject} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={formData.subjects.includes(subject)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, subjects: [...formData.subjects, subject] });
                      } else {
                        setFormData({ ...formData, subjects: formData.subjects.filter(s => s !== subject) });
                      }
                    }}
                  />
                  <span className="text-sm">{subject}</span>
                </label>
              ))}
            </div>
          </div>
        )}
        
        {formData.userType === 'student' && (
          <div>
            <Label htmlFor="learningStyle">Learning Style</Label>
            <Select value={formData.learningStyle} onValueChange={(value) => setFormData({ ...formData, learningStyle: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select your learning style" />
              </SelectTrigger>
              <SelectContent>
                {learningStyles.map((style) => (
                  <SelectItem key={style.value} value={style.value}>
                    {style.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        <div>
          <Label htmlFor="goals">Goals & Objectives</Label>
          <Textarea
            id="goals"
            value={formData.goals}
            onChange={(e) => setFormData({ ...formData, goals: e.target.value })}
            placeholder="What do you hope to achieve with EDU ZAMBIA AI?"
            rows={3}
          />
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Account Setup - Step {step} of 3</CardTitle>
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i <= step ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
        </CardHeader>
        
        <CardContent>
          {step === 1 && renderStakeholderSelection()}
          {step === 2 && renderPersonalInfo()}
          {step === 3 && renderPreferences()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={step === 1}
            >
              Back
            </Button>
            
            {step < 3 ? (
              <Button
                onClick={handleNext}
                disabled={!formData.userType || (step === 2 && !formData.fullName)}
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleComplete}
                disabled={loading}
              >
                {loading ? 'Completing...' : 'Complete Setup'}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StakeholderOnboarding;
