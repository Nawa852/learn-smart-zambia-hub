
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import { Eye, EyeOff, UserPlus, Check, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface SecureSignUpFormProps {
  onSuccess?: () => void;
}

const SecureSignUpForm = ({ onSuccess }: SecureSignUpFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
    fullName: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const calculatePasswordStrength = (password: string): number => {
    let strength = 0;
    if (password.length >= 12) strength += 25;
    if (password.length >= 8) strength += 15;
    if (/[a-z]/.test(password)) strength += 15;
    if (/[A-Z]/.test(password)) strength += 15;
    if (/[0-9]/.test(password)) strength += 15;
    if (/[^A-Za-z0-9]/.test(password)) strength += 15;
    return Math.min(strength, 100);
  };

  const getPasswordRequirements = (password: string) => {
    return [
      { text: 'At least 12 characters', met: password.length >= 12 },
      { text: 'Contains uppercase letter', met: /[A-Z]/.test(password) },
      { text: 'Contains lowercase letter', met: /[a-z]/.test(password) },
      { text: 'Contains number', met: /[0-9]/.test(password) },
      { text: 'Contains special character', met: /[^A-Za-z0-9]/.test(password) }
    ];
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: sanitizeInput(value)
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Input validation
    if (!formData.email || !formData.password || !formData.confirmPassword || !formData.fullName) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }

    if (formData.fullName.length < 2 || formData.fullName.length > 50) {
      setError('Full name must be between 2 and 50 characters');
      return;
    }

    if (calculatePasswordStrength(formData.password) < 80) {
      setError('Password does not meet security requirements');
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            full_name: formData.fullName,
          }
        }
      });

      if (error) {
        if (error.message.includes('already registered')) {
          setError('An account with this email already exists');
        } else {
          setError('Registration failed. Please try again.');
        }
        return;
      }

      if (data.user) {
        toast({
          title: "Success",
          description: "Account created successfully! Please check your email for verification.",
        });
        onSuccess?.();
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const passwordStrength = calculatePasswordStrength(formData.password);
  const passwordRequirements = getPasswordRequirements(formData.password);

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="w-5 h-5" />
          Create Account
        </CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="fullName">Full Name</Label>
            <Input
              id="fullName"
              type="text"
              value={formData.fullName}
              onChange={(e) => handleInputChange('fullName', e.target.value)}
              placeholder="Enter your full name"
              required
              minLength={2}
              maxLength={50}
              autoComplete="name"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange('email', e.target.value)}
              placeholder="Enter your email"
              required
              maxLength={254}
              autoComplete="email"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={formData.password}
                onChange={(e) => handleInputChange('password', e.target.value)}
                placeholder="Enter your password"
                required
                minLength={12}
                maxLength={128}
                autoComplete="new-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            
            {formData.password && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span>Password Strength</span>
                  <span className={passwordStrength >= 80 ? 'text-green-600' : passwordStrength >= 60 ? 'text-yellow-600' : 'text-red-600'}>
                    {passwordStrength >= 80 ? 'Strong' : passwordStrength >= 60 ? 'Medium' : 'Weak'}
                  </span>
                </div>
                <Progress value={passwordStrength} className="h-2" />
                
                <div className="space-y-1">
                  {passwordRequirements.map((req, index) => (
                    <div key={index} className="flex items-center gap-2 text-xs">
                      {req.met ? (
                        <Check className="w-3 h-3 text-green-600" />
                      ) : (
                        <X className="w-3 h-3 text-red-600" />
                      )}
                      <span className={req.met ? 'text-green-600' : 'text-red-600'}>
                        {req.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <div className="relative">
              <Input
                id="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                value={formData.confirmPassword}
                onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                placeholder="Confirm your password"
                required
                minLength={12}
                maxLength={128}
                autoComplete="new-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </Button>
            </div>
            
            {formData.confirmPassword && formData.password !== formData.confirmPassword && (
              <p className="text-xs text-red-600">Passwords do not match</p>
            )}
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || passwordStrength < 80 || formData.password !== formData.confirmPassword}
          >
            {isLoading ? 'Creating Account...' : 'Create Account'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default SecureSignUpForm;
