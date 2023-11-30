import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export default async function getProfile(user) {
  const supabase = createClientComponentClient();

  try {
    const { data, error, status } = await supabase
      .from("profiles")
      .select(
        `username, full_name, avatar_url, is_repeat, repeat_duration, destination`
      )
      .eq("id", user?.id)
      .single();

    if (error && status !== 406) {
      throw error;
    }

    if (data) {
      return data;
    }
  } catch (error) {
    console.log("error loading", error);
  }
}
