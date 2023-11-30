import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

export default async function getSession() {
  const cookieStore = cookies();
  const supabase = createServerComponentClient({ cookies: () => cookieStore });

  try {
    const response = await supabase.auth.getSession();
    const session = response?.data?.session;

    if (!session || !session.user || !session.expires_at) {
      return null;
    }

    return session;
  } catch (error) {
    console.error(error);
    return null;
  }
}
