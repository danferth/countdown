import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient();

export default async function updateProfile(
  session,
  { username, full_name, is_repeat, repeat_duration, destination }
) {
  const user = session?.user;
  console.log("username", username);
  console.log("full_name", full_name);
  console.log("is_repeat", is_repeat);
  console.log("repeat_duration", repeat_duration);
  console.log("destination", destination);
  // Validate input parameters
  if (!username || !full_name || !repeat_duration || !destination) {
    throw new Error("Missing required input parameters");
  }

  try {
    const { error } = await supabase.from("profiles").upsert({
      id: user?.id,
      username: username,
      full_name: full_name,
      is_repeat: is_repeat,
      repeat_duration: repeat_duration,
      destination: destination,
      updated_at: new Date().toISOString(),
    });
    if (error) throw error;
    return { success: true };
  } catch (error) {
    console.log("error Updating", error);
    return { success: false, error };
  }
}
