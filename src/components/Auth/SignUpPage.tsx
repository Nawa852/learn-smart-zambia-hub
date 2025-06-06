
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import { Facebook, Mail, User, Lock, GraduationCap, Users, BookOpen } from 'lucide-react';
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
  const { signUpWithEmail, signInWithFacebook } = useAuth();
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
      await signUpWithEmail(email, password, fullName);
      navigate('/login');
    } catch (error) {
      // Error is handled by AuthProvider
    } finally {
      setLoading(false);
    }
  };

  const handleFacebookSignUp = async () => {
    setLoading(true);
    try {
      await signInWithFacebook();
    } catch (error) {
      // Error is handled by AuthProvider
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-400 rounded-full opacity-15 animate-bounce" style={{ animationDuration: '3s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-400 rounded-full opacity-25 animate-ping" style={{ animationDuration: '2s' }}></div>
      </div>

      <Card className="w-full max-w-md relative z-10 shadow-2xl bg-white/95 backdrop-blur">
        <CardHeader className="text-center space-y-4">
          <div className="flex justify-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl font-bold text-gray-900">Join EDU ZAMBIA</CardTitle>
          <CardDescription className="text-lg">Start your learning journey with Africa's leading AI-powered education platform</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Button
            onClick={handleFacebookSignUp}
            variant="outline"
            className="w-full h-12 text-base border-2 hover:bg-blue-50"
            disabled={loading}
          >
            <Facebook className="mr-3 h-5 w-5 text-blue-600" />
            Continue with Facebook
          </Button>
          
          <div className="relative">
            <Separator />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="bg-white px-3 text-sm text-gray-500 font-medium">OR</span>
            </div>
          </div>

          <form onSubmit={handleEmailSignUp} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="fullName" className="text-sm font-medium">Full Name *</Label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="fullName"
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
              </div>
              {errors.fullName && <p className="text-sm text-red-600">{errors.fullName}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">Email Address *</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
              </div>
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="userType" className="text-sm font-medium">I am a *</Label>
              <Select value={userType} onValueChange={setUserType}>
                <SelectTrigger className="h-11">
                  <SelectValue placeholder="Select your role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="student">
                    <div className="flex items-center">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Student
                    </div>
                  </SelectItem>
                  <SelectItem value="teacher">
                    <div className="flex items-center">
                      <GraduationCap className="mr-2 h-4 w-4" />
                      Teacher
                    </div>
                  </SelectItem>
                  <SelectItem value="parent">
                    <div className="flex items-center">
                      <Users className="mr-2 h-4 w-4" />
                      Parent
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
              {errors.userType && <p className="text-sm text-red-600">{errors.userType}</p>}
            </div>

            {userType === 'student' && (
              <div className="space-y-2">
                <Label htmlFor="grade" className="text-sm font-medium">Grade Level *</Label>
                <Select value={grade} onValueChange={setGrade}>
                  <SelectTrigger className="h-11">
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
                  </SelectContent>
                </Select>
                {errors.grade && <p className="text-sm text-red-600">{errors.grade}</p>}
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a password (min. 6 characters)"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10 h-11"
                  required
                  minLength={6}
                />
              </div>
              {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-sm font-medium">Confirm Password *</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10 h-11"
                  required
                />
              </div>
              {errors.confirmPassword && <p className="text-sm text-red-600">{errors.confirmPassword}</p>}
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="terms" 
                checked={agreeToTerms}
                onCheckedChange={(checked) => setAgreeToTerms(checked as boolean)}
              />
              <Label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{' '}
                <Link to="/terms" className="text-blue-600 hover:underline">
                  Terms & Conditions
                </Link>{' '}
                and{' '}
                <Link to="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>
              </Label>
            </div>
            {errors.terms && <p className="text-sm text-red-600">{errors.terms}</p>}

            <Button 
              type="submit" 
              className="w-full h-12 text-base bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700" 
              disabled={loading}
            >
              {loading ? 'Creating account...' : 'Create Account'}
            </Button>
          </form>

          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account? </span>
            <Link to="/login" className="text-blue-600 hover:underline font-medium">
              Sign in
            </Link>
          </div>

          <div className="text-center text-xs text-gray-500">
            By signing up, you'll join over 50,000+ learners across Zambia
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SignUpPage;
