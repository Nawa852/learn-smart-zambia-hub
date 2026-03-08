import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/components/Auth/AuthProvider';
import { Eye, EyeOff, Lock, CheckCircle2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';
import { motion } from 'framer-motion';

interface ResetPasswordFormProps {
  onBack?: () => void;
}

const ResetPasswordForm = ({ onBack }: ResetPasswordFormProps) => {
  const [searchParams] = useSearchParams();
  const { updatePassword } = useAuth();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isInvalid, setIsInvalid] = useState(false);

  const token = searchParams.get('token');
  const email = searchParams.get('email');

  React.useEffect(() => {
    if (!token || !email) setIsInvalid(true);
  }, [token, email]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!password || !confirmPassword) { toast.error("Please fill in all fields"); return; }
    if (password.length < 8) { toast.error("Password must be at least 8 characters"); return; }
    if (password !== confirmPassword) { toast.error("Passwords don't match"); return; }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      setIsSuccess(true);
      toast.success("Password reset successfully!");
    } catch (error) {
      toast.error("Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isInvalid) {
    return (
      <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center space-y-4">
          <motion.div className="flex justify-center" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="w-16 h-16 bg-destructive rounded-full flex items-center justify-center shadow-card">
              <AlertCircle className="w-8 h-8 text-destructive-foreground" />
            </div>
          </motion.div>
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground">Invalid Reset Link</h2>
          <p className="text-muted-foreground text-sm">This password reset link has expired or is invalid.</p>
        </div>
        <Button onClick={onBack} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-card transition-all">
          Request a New Reset Link
        </Button>
      </motion.div>
    );
  }

  if (isSuccess) {
    return (
      <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
        <div className="text-center space-y-4">
          <motion.div className="flex justify-center" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ duration: 0.5, delay: 0.2 }}>
            <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <CheckCircle2 className="w-8 h-8 text-primary-foreground" />
            </div>
          </motion.div>
          <h2 className="text-2xl lg:text-3xl font-bold text-primary">Password Reset Successful!</h2>
          <p className="text-muted-foreground text-sm">Your password has been updated. You can now sign in with your new password.</p>
        </div>
        <Button onClick={onBack} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-card transition-all">
          Back to Sign In
        </Button>
      </motion.div>
    );
  }

  return (
    <motion.div className="space-y-6" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="text-center space-y-2">
        <h2 className="text-2xl lg:text-3xl font-bold text-primary">Create New Password</h2>
        <p className="text-muted-foreground text-sm">Enter a strong password for your account.</p>
      </div>

      <form onSubmit={onSubmit} className="space-y-5">
        <div className="space-y-2">
          <Label htmlFor="password" className="flex items-center gap-2 font-semibold">
            <Lock className="w-4 h-4 text-primary" /> New Password
          </Label>
          <div className="relative">
            <Input id="password" type={showPassword ? 'text' : 'password'} placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} disabled={isLoading} className="border-input focus:ring-ring transition-all pr-10" />
            <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-primary" onClick={() => setShowPassword(!showPassword)}>
              {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword" className="flex items-center gap-2 font-semibold">
            <Lock className="w-4 h-4 text-primary" /> Confirm Password
          </Label>
          <div className="relative">
            <Input id="confirmPassword" type={showConfirmPassword ? 'text' : 'password'} placeholder="••••••••" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} disabled={isLoading} className="border-input focus:ring-ring transition-all pr-10" />
            <Button type="button" variant="ghost" size="sm" className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent text-muted-foreground hover:text-primary" onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
              {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </Button>
          </div>
        </div>

        <div className="text-xs text-muted-foreground space-y-1 pt-2">
          <p>✓ At least 8 characters</p>
          <p>✓ Mix of uppercase and lowercase letters</p>
          <p>✓ Numbers and special characters recommended</p>
        </div>

        <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold shadow-card transition-all" disabled={isLoading}>
          {isLoading ? 'Resetting Password...' : 'Reset Password'}
        </Button>
      </form>
    </motion.div>
  );
};

export default ResetPasswordForm;
