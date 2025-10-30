import { useState } from "react";
import { useAuth } from "@/components/Auth/AuthProvider";
import { useProfile } from "@/hooks/useProfile";
import { toast } from "sonner";
import { WelcomeScreen } from "./WelcomeScreen";
import { GuardianLinkingStep } from "./GuardianLinkingStep";
import { LearningSphereVisualization } from "./LearningSphereVisualization";
import { GamificationSetup } from "./GamificationSetup";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2 } from "lucide-react";

interface OnboardingFlowProps {
  onComplete: () => void;
}

type UserRole = 'student' | 'teacher' | 'institution' | 'guardian';

const OnboardingFlow = ({ onComplete }: OnboardingFlowProps) => {
  const { user } = useAuth();
  const { updateProfile } = useProfile();
  const [currentStep, setCurrentStep] = useState(0);
  const [userRole, setUserRole] = useState<UserRole>('student');
  const [formData, setFormData] = useState({
    fullName: '',
    age: '',
    grade: '',
    preferredLanguage: 'English',
    learningMood: 'focused',
    motivation: '',
    guardianData: null as any,
    gamificationData: null as any,
  });

  const steps = [
    { id: 'welcome', label: 'Welcome' },
    { id: 'profile', label: 'Profile' },
    { id: 'guardian', label: 'Guardian' },
    { id: 'sphere', label: 'Learning Path' },
    { id: 'gamification', label: 'Gamification' },
    { id: 'complete', label: 'Complete' },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setUserRole(role);
    setCurrentStep(1);
  };

  const handleProfileSubmit = () => {
    if (!formData.fullName || !formData.age) {
      toast.error("Please fill in all required fields");
      return;
    }
    
    const age = parseInt(formData.age);
    if (age < 18 && userRole === 'student') {
      setCurrentStep(2); // Go to guardian linking
    } else {
      setCurrentStep(3); // Skip guardian linking
    }
  };

  const handleGuardianLink = (guardianData: any) => {
    setFormData({ ...formData, guardianData });
    setCurrentStep(3);
    toast.success("Guardian link created! They'll receive an invitation.");
  };

  const handleSkipGuardian = () => {
    setCurrentStep(3);
  };

  const handleSphereComplete = () => {
    setCurrentStep(4);
  };

  const handleGamificationComplete = async (gamificationData: any) => {
    setFormData({ ...formData, gamificationData });
    
    try {
      await updateProfile({
        full_name: formData.fullName,
        onboarding_completed: true,
      });

      toast.success("🎉 Welcome to Edu Zambia! Your journey begins now.", {
        description: "You've earned 160 EduCoins and 10 XP for completing setup!",
        duration: 5000,
      });

      setTimeout(() => {
        onComplete();
      }, 1500);
    } catch (error) {
      toast.error("Failed to complete onboarding. Please try again.");
      console.error(error);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <WelcomeScreen onRoleSelect={handleRoleSelect} />;

      case 1:
        return (
          <div className="max-w-2xl mx-auto space-y-6 p-6">
            <div className="text-center space-y-2 mb-8">
              <h2 className="text-3xl font-bold gradient-text-bright-sphere">Create Your Living Profile</h2>
              <p className="text-muted-foreground">Tell us who you are becoming</p>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="Your full name"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="age">Age *</Label>
                    <Input
                      id="age"
                      type="number"
                      placeholder="Your age"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                    />
                  </div>

                  {userRole === 'student' && (
                    <div className="space-y-2">
                      <Label htmlFor="grade">Grade</Label>
                      <Select
                        value={formData.grade}
                        onValueChange={(value) => setFormData({ ...formData, grade: value })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select grade" />
                        </SelectTrigger>
                        <SelectContent>
                          {[...Array(12)].map((_, i) => (
                            <SelectItem key={i + 1} value={`Grade ${i + 1}`}>
                              Grade {i + 1}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="language">Preferred Language</Label>
                  <Select
                    value={formData.preferredLanguage}
                    onValueChange={(value) => setFormData({ ...formData, preferredLanguage: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="English">English</SelectItem>
                      <SelectItem value="Bemba">Bemba</SelectItem>
                      <SelectItem value="Nyanja">Nyanja</SelectItem>
                      <SelectItem value="Tonga">Tonga</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="motivation">Personal Motivation</Label>
                  <Select
                    value={formData.motivation}
                    onValueChange={(value) => setFormData({ ...formData, motivation: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="What drives you?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="exam_prep">Exam Preparation</SelectItem>
                      <SelectItem value="career_growth">Career Growth</SelectItem>
                      <SelectItem value="curiosity">Pure Curiosity</SelectItem>
                      <SelectItem value="adventure">Learning Adventure</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex justify-end">
                  <Button onClick={handleProfileSubmit}>Continue</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );

      case 2:
        return (
          <div className="max-w-4xl mx-auto p-6">
            <GuardianLinkingStep onComplete={handleGuardianLink} onSkip={handleSkipGuardian} />
          </div>
        );

      case 3:
        return (
          <div className="max-w-6xl mx-auto p-6">
            <LearningSphereVisualization userRole={userRole} onComplete={handleSphereComplete} />
          </div>
        );

      case 4:
        return (
          <div className="max-w-4xl mx-auto p-6">
            <GamificationSetup onComplete={handleGamificationComplete} />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-primary/5 to-background">
      {currentStep > 0 && currentStep < 5 && (
        <div className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-semibold">Setup Progress</h3>
              <span className="text-sm text-muted-foreground">
                Step {currentStep} of {steps.length - 1}
              </span>
            </div>
            <Progress value={(currentStep / (steps.length - 1)) * 100} className="h-2" />
            <div className="flex justify-between mt-2">
              {steps.slice(1).map((step, index) => (
                <div
                  key={step.id}
                  className={`text-xs ${
                    index + 1 === currentStep
                      ? 'text-primary font-semibold'
                      : index + 1 < currentStep
                      ? 'text-green-500'
                      : 'text-muted-foreground'
                  }`}
                >
                  {index + 1 < currentStep && <CheckCircle2 className="w-3 h-3 inline mr-1" />}
                  {step.label}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      <div className={currentStep > 0 && currentStep < 5 ? 'pt-24' : ''}>
        {renderStep()}
      </div>
    </div>
  );
};

export default OnboardingFlow;
