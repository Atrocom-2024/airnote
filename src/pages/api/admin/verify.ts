import { verify } from "@/utils/jwtUtils";
import { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (!req.cookies.accessToken) {
    return res.status(400).send('토큰 없음');
  }
  if (verify(req.cookies.accessToken).ok) {
    res.redirect(307, `/admin/home`);
  } else {
    return res.redirect(`${process.env.NEXT_PUBLIC_DOMAIN}/admin`);
  }
}