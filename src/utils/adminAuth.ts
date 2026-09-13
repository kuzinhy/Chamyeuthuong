// Utility for centralized, secure Super Admin checking
// Follows strict project requirements:
// Only two emails have SUPER_ADMIN rights:
// 1. nguyenhuy.thudaumot@gmail.com
// 2. hoanghuutrung1@gmail.com

export const DEFAULT_SUPER_ADMIN_EMAILS = [
  'nguyenhuy.thudaumot@gmail.com',
  'hoanghuutrung1@gmail.com'
];

export const PROTECTED_ADMIN_EMAILS = DEFAULT_SUPER_ADMIN_EMAILS;

/**
 * Normalizes email: trim whitespace and convert to lowercase
 */
export function normalizeEmail(email?: string | null): string {
  if (!email) return '';
  return email.trim().toLowerCase();
}

/**
 * Checks if an email is one of the two official SUPER_ADMIN accounts.
 * Reads from process.env.SUPER_ADMIN_EMAILS if available (server-side),
 * otherwise defaults to DEFAULT_SUPER_ADMIN_EMAILS.
 */
export function isSuperAdminEmail(email?: string | null): boolean {
  const cleanEmail = normalizeEmail(email);
  if (!cleanEmail) return false;

  let adminList: string[] = DEFAULT_SUPER_ADMIN_EMAILS;

  // Server-side check
  if (typeof process !== 'undefined' && process.env && process.env.SUPER_ADMIN_EMAILS) {
    adminList = process.env.SUPER_ADMIN_EMAILS
      .split(',')
      .map(e => e.trim().toLowerCase())
      .filter(Boolean);
  }

  return adminList.includes(cleanEmail);
}

/**
 * Protects the two root super admins from being demoted, modified or deleted
 */
export function isProtectedAdmin(email?: string | null): boolean {
  const cleanEmail = normalizeEmail(email);
  return DEFAULT_SUPER_ADMIN_EMAILS.includes(cleanEmail);
}

export const isProtectedAdminEmail = isProtectedAdmin;
