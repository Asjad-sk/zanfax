import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import { setUser, clearUser } from '@/app/redux/slices/userSlice';
import { store } from '@/app/redux/store';
import User from '@/app/models/User';
import { NextApiRequest, NextApiResponse } from 'next';

// Define the authentication options
const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session }) {
      if (session.user?.email) {
        // Fetch user from the database
        
        const user = await User.findOne({ email: session.user.email });
        if(!user){

          const savedUser:any =  await User.create({
            email: session.user.email,
            firstName: session.user.name,
            profilepicture: session.user.image
          });
          session.user.id = savedUser._id;
          session.user.firstName = savedUser.firstName;
          session.user.profilepicture = savedUser.profilepicture;
          session.user.phoneNumber = savedUser.phoneNumber;

        }
          
        if (user) {
          session.user.id = user._id;
          session.user.firstName = user.firstName;
          session.user.profilepicture = user.profilepicture;
          session.user.phoneNumber = user.phoneNumber;
          session.user.isAdmin = user.isAdmin;
        }
   
        
      }
      return session;
    },
    async signIn({ user }) {
      if (user) {
        // Dispatch user data to Redux store on sign-in
        store.dispatch(setUser({
          userid: user.id || '',
          email: user.email || '',
          firstName: user.name || '',
          profilepicture: user.image || '',
          phoneNumber: '', // Fetch from your database or set default
          isAdmin: false, // Fetch from your database or set default
          createdAt: new Date(), // Fetch from your database or set default
          loading: false,
          error: null,
        }));
      }
      return true;
    },
    async signOut() {
      // Clear user data from Redux store on sign-out
      store.dispatch(clearUser());
      return true;
    },
  },
};

// Export named methods for HTTP requests
const handler = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, authOptions);

// Export HTTP method handlers
export const GET = handler;
export const POST = handler;
