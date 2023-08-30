export { default } from 'next-auth/middleware'

export const config = { matcher: ['/user/:path*', '/light/checkout', '/light/result/:path*'] }
