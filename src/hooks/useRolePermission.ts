import { useProfile } from './useProfile';

export type AppRole =
  | 'student' | 'teacher' | 'guardian' | 'institution' | 'ministry'
  | 'doctor' | 'entrepreneur' | 'developer' | 'skills' | 'cybersecurity';

const VIEW_RULES: Record<string, AppRole[]> = {
  // Hubs
  '/teach': ['teacher', 'institution'],
  '/family': ['guardian'],
  '/ministry': ['ministry'],
  '/admin': ['institution', 'ministry'],
  '/cybersecurity': ['cybersecurity', 'student', 'developer'],

  // Data scopes
  'view:student-data': ['student', 'teacher', 'guardian', 'institution'],
  'view:teacher-tools': ['teacher', 'institution'],
  'view:family-data': ['guardian'],
  'view:school-admin': ['institution', 'ministry'],
  'view:lesson-creation': ['teacher', 'institution'],
  'view:assessment-creation': ['teacher', 'institution'],
  'view:roster': ['teacher', 'institution'],
};

export function useRolePermission() {
  const { profile } = useProfile();
  const role = (profile?.role || 'student') as AppRole;

  const can = (key: string): boolean => {
    const allowed = VIEW_RULES[key];
    if (!allowed) return true; // unknown keys default allow
    return allowed.includes(role);
  };

  const isOneOf = (...roles: AppRole[]) => roles.includes(role);

  return { role, can, isOneOf };
}
