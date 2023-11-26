"use client";
import { Auth } from "@supabase/auth-ui-react";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import useTheme from "./useTheme";

export default function AuthForm() {
  const supabase = createClientComponentClient();
  const isLight = useTheme((state) => state.isLight);
  return (
    <div className="">
      <Auth
        supabaseClient={supabase}
        view="magic_link"
        appearance={{ theme: ThemeSupa }}
        theme={isLight ? "light" : "dark"}
        showLinks={false}
        providers={["github"]}
        redirectTo="http://localhost:3000/auth/callback"
      />
    </div>
  );
}
