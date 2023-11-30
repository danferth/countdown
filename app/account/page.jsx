import AccountForm from "../../components/account-form";
import getSession from "@/components/getSession";
export default async function Account() {
  const session = await getSession();
  return <AccountForm session={session} />;
}
