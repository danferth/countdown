import AuthForm from "../../components/auth-form";

export default function LogIn() {
  return (
    <div className="prose dark:text-gray-200">
      <h1>Log in</h1>
      <ul>
        <li>
          set up next auth
          <ul>
            <li>Github</li>
            <li>Google</li>
            <li>Apple (if available)</li>
          </ul>
        </li>
        <li>finalize basic layout</li>
      </ul>
      <AuthForm />
    </div>
  );
}
