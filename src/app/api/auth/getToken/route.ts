// pages/api/auth/getToken.ts
//import type { NextApiRequest, NextApiResponse } from 'next';
export const dynamic = 'force-dynamic';

import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';

const baseApiUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

export async function GET(req: NextRequest) {
  try {
    const accessToken = req.cookies.get('accessToken')?.value;
    const refreshToken = req.cookies.get('refreshToken')?.value;
    
    if(!refreshToken){
      return NextResponse.redirect("/auth/login")//NextResponse.json({ message: 'Não autenticador' }, {status: 401});
    }

    if (!accessToken || isTokenExpired(accessToken)) { 
      const response = await axios.post(`${baseApiUrl}/refresh`, {}, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });
      
      if(!response.data.accessToken){
        return NextResponse.json({ message: 'Não autenticado' }, {status: 401});
      }
    
      const {accessToken: newAccessToken } = response.data;

      const res = NextResponse.json({ accessToken: newAccessToken }, { status: 200 });
      res.cookies.set('accessToken', newAccessToken, {
        httpOnly: false,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
      });

      return res;
    }
    
    
    return NextResponse.json({ accessToken }, {status: 200});
  } catch (error) {
    console.log(error)
    return NextResponse.json({ message: 'Não autenticado' }, {status: 401});
  }
}

function isTokenExpired(token: string | undefined): boolean {
  if(!token) return true;

  const splited = token.split('.')[1];
  if(!splited) return true;

  const expiry = JSON.parse(atob(splited)).exp;
  return (expiry * 1000) < Date.now();
}

/* function isTokenExpired(token: string | undefined): boolean {
  if (!token) {
    console.error("Token is undefined or empty.");
    return true;
  }

  try {
    const payload = JSON.parse(atob(token.split('.')[1])); // Extract the payload
    // Token expiration logic here
    return false;
  } catch (error) {
    console.error("Failed to decode token:", error);
    return true;
  }
} */

