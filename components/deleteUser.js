import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
const supabase = createClientComponentClient();

export default async function deleteUser(id) {
  const { data, error } = await supabase.auth.admin.deleteUser(id);
  if (error) {
    console.log("delete user error", error);
  }
  if (data) {
    console.log("delete user success", data);
  }
}
