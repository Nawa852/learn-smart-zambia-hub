
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Eye, EyeOff, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/components/ui/use-toast';

interface EnhancedLoginFormProps {
  onSuccess?: () => void;
}

const EnhancedLoginForm = ({ onSuccess }: EnhancedLoginFormProps) => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [attempts, setAttempts] = useState(0);

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Rate limiting - max 5 attempts
    if (attempts >= 5) {
      setError('Too many login attempts. Please wait before trying again.');
      return;
    }

    // Input validation
    const sanitizedEmail = sanitizeInput(email);
    const sanitizedPassword = sanitizeInput(password);

    if (!sanitizedEmail || !sanitizedPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (!validateEmail(sanitizedEmail)) {
      setError('Please enter a valid email address');
      return;
    }

    if (sanitizedPassword.length < 8) {
      setError('Password must be at least 8 characters long');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: sanitizedEmail,
        password: sanitizedPassword,
      });

      if (error) {
        setAttempts(prev => prev + 1);
        if (error.message.includes('Invalid login credentials')) {
          setError('Invalid email or password');
        } else {
          setError('Login failed. Please try again.');
        }
        return;
      }

      if (data.user) {
        toast({
          title: "Success",
          description: "Logged in successfully",
        });
        setAttempts(0);
        onSuccess?.();
      }
    } catch (err) {
      setError('An unexpected error occurred');
      setAttempts(prev => prev + 1);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Secure Login
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
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                minLength={8}
                maxLength={128}
                autoComplete="current-password"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          
          <Button 
            type="submit" 
            className="w-full" 
            disabled={isLoading || attempts >= 5}
          >
            {isLoading ? 'Signing in...' : 'Sign In'}
          </Button>
          
          {attempts > 0 && attempts < 5 && (
            <p className="text-sm text-yellow-600">
              Warning: {attempts}/5 login attempts used
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
};

export default EnhancedLoginForm;
