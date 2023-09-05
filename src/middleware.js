export { default } from 'next-auth/middleware'

export const config = {
	matcher: ['/user/:path*', '/light/checkout/:path*', '/light/result/:path*'],
}
