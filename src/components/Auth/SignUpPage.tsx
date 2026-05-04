import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, User, Lock, GraduationCap, Users, BookOpen, Eye, EyeOff, MailCheck } from 'lucide-react';
import { useAuth } from './AuthProvider';
import { PasswordStrengthMeter, getPasswordStrength } from './PasswordStrengthMeter';
import { toast } from 'sonner';

const SignUpPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState('');
  const [grade, setGrade] = useState('');
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState<string | null>(null);
  const { signUp, resendVerification } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (fullName.trim().length < 2) newErrors.fullName = 'Enter your full name';
    if (!email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = 'Enter a valid email address';
    if (!password) newErrors.password = 'Password is required';
    else {
      const strength = getPasswordStrength(password);
      if (password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      else if (strength.score < 60) newErrors.password = 'Password is too weak — add uppercase, numbers or symbols';
    }
    if (password !== confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
    if (!userType) newErrors.userType = 'Please select your role';
    if (userType === 'student' && !grade) newErrors.grade = 'Please select your grade';
    if (!agreeToTerms) newErrors.terms = 'You must agree to the terms and conditions';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleEmailSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    try {
      const { error } = await signUp(email, password, fullName, userType, grade);
      if (error) {
        if (error.message?.toLowerCase().includes('already')) {
          setErrors({ ...errors, email: 'An account with this email already exists. Try signing in instead.' });
        }
      } else {
        setSignupSuccess(email);
      }
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (!signupSuccess) return;
    await resendVerification(signupSuccess);
  };

  if (signupSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background p-4">
        <Card className="w-full max-w-md shadow-card-hover bg-card text-center">
          <CardHeader className="space-y-4">
            <div className="mx-auto w-16 h-16 rounded-full bg-primary/15 flex items-center justify-center">
              <MailCheck className="w-8 h-8 text-primary" />
            </div>
            <CardTitle className="text-2xl">Check your email</CardTitle>
            <CardDescription>
              We sent a verification link to <span className="font-semibold text-foreground">{signupSuccess}</span>.
              Click the link to activate your Edu Zambia account.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button variant="outline" className="w-full" onClick={handleResend}>
              Resend verification email
            </Button>
            <Button variant="ghost" className="w-full" onClick={() => navigate('/login')}>
              Back to sign in
            </Button>
            <p className="text-xs text-muted-foreground">
              Didn't get it? Check your spam folder, or wait a minute and resend.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md relative z-10 shadow-card-hover bg-card">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold">Join EDU ZAMBIA</CardTitle>
          <CardDescription className="text-lg">Start your learning journey with Africa's leading AI-powered education platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="fullName" type="text" placeholder="Enter your full name" value={fullName} onChange={(e) => setFullName(e.target.value)} className="pl-10 h-11" required />
              </div>
              {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="email" type="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} className="pl-10 h-11" required />
              </div>
              {errors.email && <p className="text-sm text-destructive">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType" className="text-sm font-medium">I am a *</Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger className="h-11"><SelectValue placeholder="Select your role" /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="student"><div className="flex items-center"><BookOpen className="mr-2 h-4 w-4" />Student</div></SelectItem>
                  <SelectItem value="teacher"><div className="flex items-center"><GraduationCap className="mr-2 h-4 w-4" />Teacher</div></SelectItem>
                  <SelectItem value="parent"><div className="flex items-center"><Users className="mr-2 h-4 w-4" />Parent</div></SelectItem>
                  <SelectItem value="entrepreneur"><div className="flex items-center"><BookOpen className="mr-2 h-4 w-4" />Entrepreneur</div></SelectItem>
                  <SelectItem value="developer"><div className="flex items-center"><BookOpen className="mr-2 h-4 w-4" />Developer</div></SelectItem>
                  <SelectItem value="doctor"><div className="flex items-center"><BookOpen className="mr-2 h-4 w-4" />Medical Student</div></SelectItem>
                  <SelectItem value="skills"><div className="flex items-center"><BookOpen className="mr-2 h-4 w-4" />Skills Development</div></SelectItem>
                  <SelectItem value="cybersecurity"><div className="flex items-center"><BookOpen className="mr-2 h-4 w-4" />Cybersecurity</div></SelectItem>
                </SelectContent>
              </Select>
              {errors.userType && <p className="text-sm text-destructive">{errors.userType}</p>}
            </div>

            {userType === 'student' && (
              <div className="space-y-2">
                <Label htmlFor="grade" className="text-sm font-medium">Grade Level *</Label>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Select your grade" /></SelectTrigger>
                  <SelectContent>
                    {Array.from({ length: 12 }, (_, i) => i + 1).map((gradeNum) => (
                      <SelectItem key={gradeNum} value={`grade-${gradeNum}`}>Grade {gradeNum}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.grade && <p className="text-sm text-destructive">{errors.grade}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a strong password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 pr-10 h-11"
                  required
                  minLength={8}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <PasswordStrengthMeter password={password} />
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type={showConfirm ? 'text' : 'password'}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 pr-10 h-11"
                  required
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm((s) => !s)}
                  className="absolute right-3 top-3 text-muted-foreground hover:text-foreground"
                  aria-label={showConfirm ? 'Hide password' : 'Show password'}
                >
                  {showConfirm ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              {errors.confirmPassword && <p className="text-sm text-destructive">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox id="terms" checked={agreeToTerms} onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)} />
              <Label htmlFor="terms" className="text-sm text-muted-foreground">
                I agree to the <Link to="/terms" className="text-primary hover:underline">Terms & Conditions</Link> and <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
              </Label>
            </div>
            {errors.terms && <p className="text-sm text-destructive">{errors.terms}</p>}

            <Button type="submit" className="w-full h-12 text-base" disabled={loading}>
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-muted-foreground">Already have an account? </span>
            <Link to="/login" className="text-primary hover:underline font-medium">Sign in</Link>
          </div>
          <div className="text-center text-xs text-muted-foreground">
            By signing up, you'll join over 50,000+ learners across Zambia
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
