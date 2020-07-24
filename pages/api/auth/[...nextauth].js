import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
const baseUrl = process.env.SITE || 'http://localhost:3000'
const options = {
  site: baseUrl,
  // Configure one or more authentication providers
  providers: [
    Providers.GitHub({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET
    }),
    Providers.Google({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],
  pages: {
    signin: '/auth/signin',
    signout: '/auth/signout',
  },
}


export default (req, res) => NextAuth(req, res, options)
