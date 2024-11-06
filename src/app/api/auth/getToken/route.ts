// pages/api/auth/getToken.ts
//import type { NextApiRequest, NextApiResponse } from 'next';
import { NextResponse, NextRequest } from 'next/server';
import axios from 'axios';
import { cookies } from 'next/headers';

const baseApiUrl = process.env.API_URL;

export async function GET(req: NextRequest, res: NextResponse) {
  try {
/*     const accessToken = cookies().get('accessToken')?.value;
    const refreshToken = cookies().get('refreshToken')?.value; */
    const accessToken = req.cookies.get('accessToken')?.value;
    const refreshToken = req.cookies.get('refreshToken')?.value;
    
    console.log("token", accessToken, "\n\n",refreshToken);
    if(!refreshToken){
      return NextResponse.redirect("/auth/login")//NextResponse.json({ message: 'Não autenticador' }, {status: 401});
    }

    if (!accessToken || isTokenExpired(accessToken)) { 
      const response = await axios.post(`${baseApiUrl}/refresh`, {}, {
        headers: { Authorization: `Bearer ${refreshToken}` },
      });
      
      if(!response.data.accessToken){
/*         cookies().delete('accessToken');
        cookies().delete('refreshToken'); */
        //console.log(cookies().getAll());
        return NextResponse.json({ message: 'Não autenticado' }, {status: 401});
      }
    
      const {accessToken: newAccessToken } = response.data;
      cookies().set('accessToken', newAccessToken);
      
      return NextResponse.json({ accessToken: newAccessToken }, {status: 200});
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

