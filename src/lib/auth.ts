const AUTH_KEY = 'novatech:signed-in'
const EMAIL_KEY = 'novatech:email'

export function isAuthenticated() {
  return sessionStorage.getItem(AUTH_KEY) === '1'
}

export function signIn(email: string) {
  sessionStorage.setItem(AUTH_KEY, '1')
  sessionStorage.setItem(EMAIL_KEY, email)
}

export function signOut() {
  sessionStorage.removeItem(AUTH_KEY)
  sessionStorage.removeItem(EMAIL_KEY)
}

export function getEmail() {
  return sessionStorage.getItem(EMAIL_KEY) ?? 'admin@novatech.io'
}

export function getInitials(email: string) {
  const [local] = email.split('@')
  const parts = local.replace(/[._-]+/g, ' ').trim().split(' ')

  return parts
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join('')
}
