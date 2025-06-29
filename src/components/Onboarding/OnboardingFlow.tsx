
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useProfile } from '@/hooks/useProfile';
import { useAuth } from '@/components/Auth/AuthProvider';
import { useToast } from '@/components/ui/use-toast';
import { User, GraduationCap, Globe, Palette, MapPin } from 'lucide-react';

const OnboardingFlow = ({ onComplete }: { onComplete: () => void }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    role: '',
    full_name: '',
    grade_level: '',
    curriculum: 'ECZ',
    preferred_language: 'english',
    learning_style: '',
    location: '',
    school_name: '',
    phone_number: '',
    parent_contact: ''
  });
  
  const { updateProfile } = useProfile();
  const { user } = useAuth();
  const { toast } = useToast();

  const roles = [
    { value: 'student', label: 'Student', icon: '🎓', description: 'I am here to learn' },
    { value: 'teacher', label: 'Teacher', icon: '👨‍🏫', description: 'I am here to teach' },
    { value: 'parent', label: 'Parent', icon: '👨‍👩‍👧‍👦', description: 'I want to monitor my child' },
    { value: 'mentor', label: 'Mentor', icon: '🧑‍💼', description: 'I want to guide students' },
    { value: 'admin', label: 'Administrator', icon: '⚙️', description: 'I manage educational content' }
  ];

  const languages = [
    { value: 'english', label: 'English' },
    { value: 'bemba', label: 'Bemba' },
    { value: 'nyanja', label: 'Nyanja' },
    { value: 'tonga', label: 'Tonga' },
    { value: 'lozi', label: 'Lozi' },
    { value: 'kaonde', label: 'Kaonde' },
    { value: 'lunda', label: 'Lunda' }
  ];

  const learningStyles = [
    { value: 'visual', label: 'Visual', description: 'I learn best with images and diagrams' },
    { value: 'auditory', label: 'Auditory', description: 'I learn best by listening' },
    { value: 'kinesthetic', label: 'Kinesthetic', description: 'I learn best by doing' },
    { value: 'mixed', label: 'Mixed', description: 'I use multiple learning approaches' }
  ];

  const handleSubmit = async () => {
    const result = await updateProfile({
      ...formData,
      email: user?.email || ''
    });

    if (result?.success) {
      toast({
        title: "Welcome to Edu Zambia!",
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

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <User className="w-16 h-16 mx-auto mb-4 text-blue-600" />
              <h2 className="text-2xl font-bold">What's your role?</h2>
              <p className="text-gray-600">This helps us personalize your experience</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roles.map((role) => (
                <Card
                  key={role.value}
                  className={`cursor-pointer transition-all hover:shadow-md ${
                    formData.role === role.value ? 'ring-2 ring-blue-500 bg-blue-50' : ''
                  }`}
                  onClick={() => setFormData(prev => ({ ...prev, role: role.value }))}
                >
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl mb-2">{role.icon}</div>
                    <h3 className="font-semibold mb-1">{role.label}</h3>
                    <p className="text-sm text-gray-600">{role.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <GraduationCap className="w-16 h-16 mx-auto mb-4 text-green-600" />
              <h2 className="text-2xl font-bold">Tell us about yourself</h2>
              <p className="text-gray-600">This helps us customize your learning experience</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="full_name">Full Name</Label>
                <Input
                  id="full_name"
                  value={formData.full_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                  placeholder="Enter your full name"
                />
              </div>
              
              {formData.role === 'student' && (
                <div>
                  <Label htmlFor="grade_level">Grade Level</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, grade_level: value }))}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your grade" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="grade-1">Grade 1</SelectItem>
                      <SelectItem value="grade-2">Grade 2</SelectItem>
                      <SelectItem value="grade-3">Grade 3</SelectItem>
                      <SelectItem value="grade-4">Grade 4</SelectItem>
                      <SelectItem value="grade-5">Grade 5</SelectItem>
                      <SelectItem value="grade-6">Grade 6</SelectItem>
                      <SelectItem value="grade-7">Grade 7</SelectItem>
                      <SelectItem value="grade-8">Grade 8</SelectItem>
                      <SelectItem value="grade-9">Grade 9</SelectItem>
                      <SelectItem value="grade-10">Grade 10</SelectItem>
                      <SelectItem value="grade-11">Grade 11</SelectItem>
                      <SelectItem value="grade-12">Grade 12</SelectItem>
                      <SelectItem value="university">University</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              <div>
                <Label htmlFor="curriculum">Curriculum</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, curriculum: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select curriculum" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ECZ">ECZ (Examinations Council of Zambia)</SelectItem>
                    <SelectItem value="Cambridge">Cambridge International</SelectItem>
                    <SelectItem value="university">University Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="school_name">School/Institution</Label>
                <Input
                  id="school_name"
                  value={formData.school_name}
                  onChange={(e) => setFormData(prev => ({ ...prev, school_name: e.target.value }))}
                  placeholder="Enter your school or institution name"
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Globe className="w-16 h-16 mx-auto mb-4 text-purple-600" />
              <h2 className="text-2xl font-bold">Language & Location</h2>
              <p className="text-gray-600">Help us serve you in your preferred language</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="preferred_language">Preferred Language</Label>
                <Select onValueChange={(value) => setFormData(prev => ({ ...prev, preferred_language: value }))}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your preferred language" />
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
                <Label htmlFor="location">Location (Province/City)</Label>
                <Input
                  id="location"
                  value={formData.location}
                  onChange={(e) => setFormData(prev => ({ ...prev, location: e.target.value }))}
                  placeholder="e.g., Lusaka, Copperbelt, Eastern Province"
                />
              </div>

              <div>
                <Label htmlFor="phone_number">Phone Number (Optional)</Label>
                <Input
                  id="phone_number"
                  value={formData.phone_number}
                  onChange={(e) => setFormData(prev => ({ ...prev, phone_number: e.target.value }))}
                  placeholder="+260 XXX XXX XXX"
                />
              </div>

              {formData.role === 'student' && (
                <div>
                  <Label htmlFor="parent_contact">Parent/Guardian Contact</Label>
                  <Input
                    id="parent_contact"
                    value={formData.parent_contact}
                    onChange={(e) => setFormData(prev => ({ ...prev, parent_contact: e.target.value }))}
                    placeholder="Parent's phone number or email"
                  />
                </div>
              )}
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-6">
              <Palette className="w-16 h-16 mx-auto mb-4 text-orange-600" />
              <h2 className="text-2xl font-bold">How do you learn best?</h2>
              <p className="text-gray-600">This helps our AI tutor adapt to your style</p>
            </div>
            <RadioGroup
              value={formData.learning_style}
              onValueChange={(value) => setFormData(prev => ({ ...prev, learning_style: value }))}
              className="space-y-4"
            >
              {learningStyles.map((style) => (
                <div key={style.value} className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-gray-50">
                  <RadioGroupItem value={style.value} id={style.value} />
                  <div className="flex-1">
                    <Label htmlFor={style.value} className="font-medium cursor-pointer">
                      {style.label}
                    </Label>
                    <p className="text-sm text-gray-600">{style.description}</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      default:
        return null;
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1: return formData.role !== '';
      case 2: return formData.full_name !== '' && formData.curriculum !== '';
      case 3: return formData.preferred_language !== '';
      case 4: return formData.learning_style !== '';
      default: return false;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Welcome to Edu Zambia
          </CardTitle>
          <div className="flex justify-center mt-4">
            <div className="flex space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full ${
                    i <= step ? 'bg-blue-600' : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-2">Step {step} of 4</p>
        </CardHeader>
        <CardContent className="p-6">
          {renderStep()}
          <div className="flex justify-between mt-8">
            <Button
              variant="outline"
              onClick={() => setStep(s => Math.max(1, s - 1))}
              disabled={step === 1}
            >
              Back
            </Button>
            {step < 4 ? (
              <Button
                onClick={() => setStep(s => s + 1)}
                disabled={!canProceed()}
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

export default OnboardingFlow;
