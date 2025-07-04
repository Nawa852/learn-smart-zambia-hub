
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Textarea } from '@/components/ui/textarea';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useToast } from '@/components/ui/use-toast';
import { User, GraduationCap, Users, Heart, Building, Phone, Mail, MapPin, Globe } from 'lucide-react';

interface StakeholderData {
  stakeholder_type: string;
  full_name: string;
  phone_number: string;
  location: string;
  grade_level?: string;
  school_name?: string;
  parent_contact?: string;
  parent_email?: string;
  student_email?: string;
  subjects_of_interest?: string[];
  learning_goals?: string;
  preferred_language: string;
  curriculum: string;
  additional_info?: string;
}

const StakeholderOnboarding = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<StakeholderData>({
    stakeholder_type: '',
    full_name: '',
    phone_number: '',
    location: '',
    preferred_language: 'english',
    curriculum: 'ECZ',
    subjects_of_interest: [],
  });
  
  const { updateProfile } = useProfile();
  const { user } = useAuth();
  const { toast } = useToast();

  const stakeholderTypes = [
    {
      value: 'student',
      label: 'Student',
      icon: GraduationCap,
      description: 'I am here to learn and improve my academic performance',
      color: 'bg-blue-50 border-blue-200 hover:bg-blue-100'
    },
    {
      value: 'parent',
      label: 'Parent/Guardian',
      icon: Heart,
      description: 'I want to monitor and support my child\'s education',
      color: 'bg-green-50 border-green-200 hover:bg-green-100'
    },
    {
      value: 'teacher',
      label: 'Teacher',
      icon: User,
      description: 'I am here to teach and create educational content',
      color: 'bg-purple-50 border-purple-200 hover:bg-purple-100'
    },
    {
      value: 'mentor',
      label: 'Mentor/Tutor',
      icon: Users,
      description: 'I provide guidance and support to students',
      color: 'bg-orange-50 border-orange-200 hover:bg-orange-100'
    },
    {
      value: 'administrator',
      label: 'School Administrator',
      icon: Building,
      description: 'I manage educational institutions and programs',
      color: 'bg-red-50 border-red-200 hover:bg-red-100'
    }
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'bemba', label: 'Bemba' },
    { value: 'nyanja', label: 'Nyanja' },
    { value: 'tonga', label: 'Tonga' },
    { value: 'lozi', label: 'Lozi' },
    { value: 'kaonde', label: 'Kaonde' },
    { value: 'luvale', label: 'Luvale' }
  ];

  const subjects = [
    'Mathematics', 'English', 'Science', 'Physics', 'Chemistry', 'Biology',
    'History', 'Geography', 'Civic Education', 'Religious Education',
    'Computer Studies', 'Business Studies', 'Economics', 'Accounting',
    'Literature', 'French', 'Art', 'Music', 'Physical Education'
  ];

  const handleSubjectToggle = (subject: string) => {
    setFormData(prev => ({
      ...prev,
      subjects_of_interest: prev.subjects_of_interest?.includes(subject)
        ? prev.subjects_of_interest.filter(s => s !== subject)
        : [...(prev.subjects_of_interest || []), subject]
    }));
  };

  const handleSubmit = async () => {
    const result = await updateProfile({
      ...formData,
      email: user?.email || '',
      role: formData.stakeholder_type,
      user_type: formData.stakeholder_type
    });

    if (result?.success) {
      toast({
        title: "Welcome to EduZambia!",
        description: "Your profile has been set up successfully.",
      });
      onComplete();
    } else {
      toast({
        title: "Error",
        description: "Failed to set up your profile. Please try again.",
        variant: "destructive",
      });
    }
  };

  const renderStakeholderSelection = () => (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent mb-4">
          Welcome to EduZambia!
        </h2>
        <p className="text-gray-600 text-lg">Let's set up your account. What's your role in education?</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {stakeholderTypes.map((type) => {
          const IconComponent = type.icon;
          return (
            <Card
              key={type.value}
              className={`cursor-pointer transition-all duration-200 ${
                formData.stakeholder_type === type.value 
                  ? 'ring-2 ring-blue-500 bg-blue-50' 
                  : type.color
              }`}
              onClick={() => setFormData(prev => ({ ...prev, stakeholder_type: type.value }))}
            >
              <CardContent className="p-6 text-center">
                <IconComponent className="w-12 h-12 mx-auto mb-4 text-gray-700" />
                <h3 className="font-bold text-lg mb-2">{type.label}</h3>
                <p className="text-sm text-gray-600">{type.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );

  const renderBasicInfo = () => (
    <div className="space-y-6">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Basic Information</h2>
        <p className="text-gray-600">Tell us about yourself</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <div>
            <Label htmlFor="full_name">Full Name *</Label>
            <Input
              id="full_name"
              value={formData.full_name}
              onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
              placeholder="Enter your full name"
            />
          </div>
          
          <div>
            <Label htmlFor="phone_number">Phone Number *</Label>
            <Input
              id="phone_number"
              value={formData.phone_number}
              onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
              placeholder="+260 XXX XXX XXX"
            />
          </div>
          
          <div>
            <Label htmlFor="location">Location (Province/City) *</Label>
            <Input
              id="location"
              value={formData.location}
              onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
              placeholder="e.g., Lusaka, Copperbelt"
            />
          </div>
        </div>
        
        <div className="space-y-4">
          <div>
            <Label htmlFor="preferred_language">Preferred Language *</Label>
            <Select value={formData.preferred_language} onValueChange={(value) => setFormData(prev => ({ ...prev, preferred_language: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select language" />
              </SelectTrigger>
              <SelectContent>
                {languages.map((lang) => (
                  <SelectItem key={lang.value} value={lang.value}>
                    {lang.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="curriculum">Curriculum *</Label>
            <Select value={formData.curriculum} onValueChange={(value) => setFormData(prev => ({ ...prev, curriculum: value }))}>
              <SelectTrigger>
                <SelectValue placeholder="Select curriculum" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ECZ">ECZ (Examinations Council of Zambia)</SelectItem>
                <SelectItem value="Cambridge">Cambridge International</SelectItem>
                <SelectItem value="IB">International Baccalaureate</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="school_name">School/Institution</Label>
            <Input
              id="school_name"
              value={formData.school_name || ''}
              onChange={(e) => setFormData(prev => ({ ...prev, school_name: e.target.value }))}
              placeholder="Enter school or institution name"
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderStakeholderSpecific = () => {
    switch (formData.stakeholder_type) {
      case 'student':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <GraduationCap className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-2xl font-bold">Student Information</h2>
              <p className="text-gray-600">Help us personalize your learning experience</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="grade_level">Grade Level *</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, grade_level: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={`grade-${i + 1}`}>Grade {i + 1}</SelectItem>
                      ))}
                      <SelectItem value="university">University</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="parent_contact">Parent/Guardian Phone *</Label>
                  <Input
                    id="parent_contact"
                    value={formData.parent_contact || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, parent_contact: e.target.value }))}
                    placeholder="+260 XXX XXX XXX"
                  />
                </div>
                
                <div>
                  <Label htmlFor="parent_email">Parent/Guardian Email</Label>
                  <Input
                    id="parent_email"
                    type="email"
                    value={formData.parent_email || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, parent_email: e.target.value }))}
                    placeholder="parent@example.com"
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Subjects of Interest</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                    {subjects.slice(0, 10).map((subject) => (
                      <label key={subject} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.subjects_of_interest?.includes(subject) || false}
                          onChange={() => handleSubjectToggle(subject)}
                          className="rounded border-gray-300"
                        />
                        <span>{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="learning_goals">Learning Goals</Label>
                  <Textarea
                    id="learning_goals"
                    value={formData.learning_goals || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, learning_goals: e.target.value }))}
                    placeholder="What do you want to achieve this year?"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      case 'parent':
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Heart className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-2xl font-bold">Parent/Guardian Information</h2>
              <p className="text-gray-600">Help us connect you with your child's education</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="student_email">Student's Email</Label>
                  <Input
                    id="student_email"
                    type="email"
                    value={formData.student_email || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, student_email: e.target.value }))}
                    placeholder="student@example.com"
                  />
                </div>
                
                <div>
                  <Label htmlFor="grade_level">Student's Grade Level</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, grade_level: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {Array.from({ length: 12 }, (_, i) => (
                        <SelectItem key={i + 1} value={`grade-${i + 1}`}>Grade {i + 1}</SelectItem>
                      ))}
                      <SelectItem value="university">University</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <Label>Subjects to Monitor</Label>
                  <div className="grid grid-cols-2 gap-2 mt-2 max-h-40 overflow-y-auto">
                    {subjects.slice(0, 10).map((subject) => (
                      <label key={subject} className="flex items-center space-x-2 text-sm">
                        <input
                          type="checkbox"
                          checked={formData.subjects_of_interest?.includes(subject) || false}
                          onChange={() => handleSubjectToggle(subject)}
                          className="rounded border-gray-300"
                        />
                        <span>{subject}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="additional_info">Additional Information</Label>
                  <Textarea
                    id="additional_info"
                    value={formData.additional_info || ''}
                    onChange={(e) => setFormData(prev => ({ ...prev, additional_info: e.target.value }))}
                    placeholder="Any special needs or concerns about your child's education?"
                    rows={3}
                  />
                </div>
              </div>
            </div>
          </div>
        );
        
      default:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Building className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h2 className="text-2xl font-bold">Professional Information</h2>
              <p className="text-gray-600">Tell us about your educational role</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>Areas of Expertise</Label>
                <div className="grid grid-cols-3 gap-2 mt-2 max-h-40 overflow-y-auto">
                  {subjects.map((subject) => (
                    <label key={subject} className="flex items-center space-x-2 text-sm">
                      <input
                        type="checkbox"
                        checked={formData.subjects_of_interest?.includes(subject) || false}
                        onChange={() => handleSubjectToggle(subject)}
                        className="rounded border-gray-300"
                      />
                      <span>{subject}</span>
                    </label>
                  ))}
                </div>
              </div>
              
              <div>
                <Label htmlFor="additional_info">Professional Goals</Label>
                <Textarea
                  id="additional_info"
                  value={formData.additional_info || ''}
                  onChange={(e) => setFormData(prev => ({ ...prev, additional_info: e.target.value }))}
                  placeholder="What do you hope to achieve on this platform?"
                  rows={4}
                />
              </div>
            </div>
          </div>
        );
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.stakeholder_type !== '';
      case 2: return formData.full_name && formData.phone_number && formData.location;
      case 3: return true; // Stakeholder specific info is optional
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-4xl">
        <CardHeader className="text-center">
          <div className="flex justify-center mt-4 mb-6">
            <div className="flex space-x-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-colors ${
                    i <= step ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600">Step {step} of 3</p>
        </CardHeader>
        
        <CardContent className="p-8">
          {step === 1 && renderStakeholderSelection()}
          {step === 2 && renderBasicInfo()}
          {step === 3 && renderStakeholderSpecific()}
          
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              Back
            </Button>
            {step < 3 ? (
              <Button
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-blue-600 to-green-600"
              >
                Next
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                disabled={!canProceed()}
                className="bg-gradient-to-r from-blue-600 to-green-600"
              >
                Complete Setup
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default StakeholderOnboarding;
