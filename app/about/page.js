import GithubLogo from "../../components/github";
export default function About() {
  return (
    <div
      className="prose xl:prose-lg pt-12 mb-6 px-2.5 sm:px-0
    text-base-content prose-code:bg-base-200"
    >
      <h1 className="text-base-content">The Reason I Built Countdown</h1>
      <p>
        I&apos;ve been doing this for a while so most of the cool things built
        in my career are either in an older stack like{" "}
        <code>PHP/MySQL/Apache</code> or were for internal use so in a private
        repo and <i>not allowed to show.</i> So I build countdown, something to
        show skills I see requested in job postings and using my current
        preferred stack of <code>React/Next.js/PostgreSQL</code>.
      </p>

      <blockquote>
        Why make someone look through three or ten repositories when you can
        answer most of their questions with one.
      </blockquote>

      <h2 className="text-base-content">What Skills Am I Showing?</h2>
      <ul>
        <li>Make an API request (Kanye Quotes)</li>
        <li>
          Some sort of functionality to show you can caculating something (time
          countdown)
        </li>
        <li>Global state (countdown target date/time)</li>
        <li>Set up a form to change global state</li>
        <li>Database integration: supabase db</li>
        <li>Authorization (login)</li>
        <li>Have user profile (db) update gloabl state</li>
        <li>Design somthing that dosen&apos;t look like bootstrap</li>
        <li>Repo that is&squot;t tied to work and was publicly available</li>
        <li>Typscript is always asked for these days</li>
        <li>Host it somewhere so you can play with it</li>
      </ul>
      <p>
        Here&apos;s the link to the{" "}
        <a
          className="inline-flex flex-row items-center justify-start"
          href="https://github.com/danferth/next-friday"
        >
          <span className="mr-2.5">repository</span>
          <GithubLogo className="h-5 w-auto text-gray-600  fill-current" />
        </a>
      </p>
    </div>
  );
}
