

## Plan: Link Settings Security Section to MFA Setup Page

**What**: Add a direct link/button in the Settings page's Account/Security tab that navigates to `/mfa-setup`.

**How**: Edit `src/pages/SettingsPage.tsx` — in the Account tab's security section, add a glassmorphic button/card that links to the MFA setup page using `useNavigate`. Style it consistently with the existing dark premium aesthetic (glass-card, glow effects, Shield icon).

**Single file change**: `src/pages/SettingsPage.tsx`

