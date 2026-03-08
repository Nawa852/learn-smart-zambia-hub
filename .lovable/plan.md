

## Plan: Link Settings Security Section to MFA Setup Page

**File**: `src/pages/SettingsPage.tsx` (~line 213)

Add `action: () => navigate('/mfa-setup')` to the "Two-Factor Authentication" entry in the Security section, matching the existing "Change Password" pattern.

