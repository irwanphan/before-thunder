// import { UserRoleEnum } from "@/enums/UserRoleEnum";
import { JWT } from 'next-auth/jwt';
import { NextRequest } from 'next/server';

export function isAccessAuthorized({ token, req }: { token: JWT | null; req: NextRequest }) {
  const { pathname } = req.nextUrl;

  // check if protected routes
  // if (pathname === "/admin") {
  //   return [UserRoleEnum.ADMIN].includes(
  //     token?.role as UserRoleEnum,
  //   );
  // }

  return true;
}
