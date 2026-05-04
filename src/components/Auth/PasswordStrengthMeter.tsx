import { Progress } from '@/components/ui/progress';
import { Check, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface PasswordStrength {
  score: number; // 0-100
  label: string;
  color: string;
  checks: { label: string; passed: boolean }[];
}

export function getPasswordStrength(password: string): PasswordStrength {
  const checks = [
    { label: 'At least 8 characters', passed: password.length >= 8 },
    { label: 'Uppercase letter', passed: /[A-Z]/.test(password) },
    { label: 'Lowercase letter', passed: /[a-z]/.test(password) },
    { label: 'Number', passed: /\d/.test(password) },
    { label: 'Special character', passed: /[^A-Za-z0-9]/.test(password) },
  ];
  const passed = checks.filter((c) => c.passed).length;
  const score = Math.round((passed / checks.length) * 100);
  let label = 'Very weak';
  let color = 'bg-destructive';
  if (score >= 80) { label = 'Strong'; color = 'bg-green-500'; }
  else if (score >= 60) { label = 'Good'; color = 'bg-blue-500'; }
  else if (score >= 40) { label = 'Fair'; color = 'bg-yellow-500'; }
  else if (score >= 20) { label = 'Weak'; color = 'bg-orange-500'; }
  return { score, label, color, checks };
}

export const PasswordStrengthMeter = ({ password }: { password: string }) => {
  if (!password) return null;
  const s = getPasswordStrength(password);
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between text-xs">
        <span className="text-muted-foreground">Password strength</span>
        <span className="font-medium">{s.label}</span>
      </div>
      <div className="h-1.5 w-full bg-muted rounded-full overflow-hidden">
        <div
          className={cn('h-full transition-all', s.color)}
          style={{ width: `${s.score}%` }}
        />
      </div>
      <ul className="grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
        {s.checks.map((c) => (
          <li
            key={c.label}
            className={cn(
              'flex items-center gap-1.5',
              c.passed ? 'text-green-600' : 'text-muted-foreground'
            )}
          >
            {c.passed ? <Check className="w-3 h-3" /> : <X className="w-3 h-3" />}
            {c.label}
          </li>
        ))}
      </ul>
    </div>
  );
};
