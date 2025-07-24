// Security and validation utilities for Amancom React frontend

// Remove potentially dangerous HTML (basic XSS prevention)
export function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, tag => (
    ({'&':'&amp;','<':'&lt;','>':'&gt;','\'':'&#39;','"':'&quot;'})[tag] || tag
  ));
}

// Basic input sanitization (trims and escapes HTML)
export function sanitizeInput(input) {
  if (typeof input !== 'string') return '';
  return escapeHTML(input.trim());
}

// Email validation (simple regex)
export function validateEmail(email) {
  return /^[\w-.]+@[\w-]+\.[a-zA-Z]{2,}$/.test(email);
}

// Phone validation (accepts numbers, spaces, dashes, plus)
export function validatePhone(phone) {
  return /^[+]?([0-9\s-]){7,20}$/.test(phone);
}

// Password strength: min 8 chars, at least 1 letter and 1 number
export function validatePasswordStrength(password) {
  return /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=]{8,}$/.test(password);
}

// Add more security/validation functions as needed 