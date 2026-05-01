import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Mail, User, Lock, GraduationCap, Users, BookOpen } from 'lucide-react';
import { useAuth } from './AuthProvider';

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
  const { signUp } = useAuth();
  const navigate = useNavigate();

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!email.trim()) newErrors.email = 'Email is required';
    if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = 'Email is invalid';
    if (!password) newErrors.password = 'Password is required';
    if (password.length < 6) newErrors.password = 'Password must be at least 6 characters';
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
      if (error?.message.includes('User already exists')) {
        setErrors({ ...errors, email: 'A user with this email already exists.' });
      }
    } catch (error) {
      console.error('Sign up error:', error);
    } finally {
      setLoading(false);
    }
  };


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
                <Input id="password" type="password" placeholder="Create a password (min. 6 characters)" value={password} onChange={(e) => setPassword(e.target.value)} className="pl-10 h-11" required minLength={6} />
              </div>
              {errors.password && <p className="text-sm text-destructive">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input id="confirmPassword" type="password" placeholder="Confirm your password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="pl-10 h-11" required />
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
