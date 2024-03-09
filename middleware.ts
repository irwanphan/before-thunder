import { NextRequestWithAuth, withAuth } from 'next-auth/middleware';
import { isAccessAuthorized } from './lib/auth';

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    const { pathname } = request.nextUrl;
    console.log('middleware is running');
    console.log('pathname', pathname);
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        return isAccessAuthorized({ token, req });
      },
    },
  }
);
