# Security Specification: Professional CMS

## 1. Data Invariants
- Only `super_admin` can manage user roles and system-wide settings.
- `admin` can manage content, media, and site settings.
- `editor` can create and edit posts but cannot delete or publish without approval (workflow).
- `viewer` can only read dashboard data.
- Public users can only read `published` posts and public site settings.
- All writes must include proper timestamps and user IDs where applicable.
- Slugs must be unique and follow a specific pattern.

## 2. The "Dirty Dozen" Payloads (Deny Cases)
1. **Self-Promotion**: An `editor` trying to update their own `role` to `super_admin` in `/users/{uid}`.
2. **Unauthorized Post Delete**: A `viewer` trying to delete a post in `/posts/{id}`.
3. **Draft Leak**: A public user trying to read a post with `status: "draft"`.
4. **ID Poisoning**: Creating a post with a 2MB string as its ID.
5. **Timestamp Spoofing**: Setting `publishedAt` to a future date from the client.
6. **Ghost Field**: Adding `isVerified: true` to a post during update.
7. **Cross-User Edit**: `editor_A` trying to edit a post owned by `editor_B` (if restricted).
8. **Malicious Slug**: Setting `slug: "../dangerous/path"`.
9. **Role Bypass**: Setting `role: "admin"` during initial registration (create).
10. **System Override**: Modifying `siteSettings/system` as an `editor`.
11. **Log Tampering**: Deleting an entry in `auditLogs`.
12. **Unverified Auth**: Performing any write operation without a verified email.

## 3. Test Runner (Conceptual)
A test suite will be implemented to verify:
- `get(/users/{uid}).role` check for all non-public operations.
- `incoming().diff(existing()).affectedKeys()` for action-based updates.
- `isValidPost(incoming())` on all post writes.
