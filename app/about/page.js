import GithubLogo from "../../components/github";
export default function About() {
  return (
    <div
      className="prose prose-xl lg:prose-lg pt-12 mb-6 px-2.5
    text-base-content prose-code:bg-base-200"
    >
      <p>
        <a
          className="flex flex-row items-center justify-start"
          href="https://github.com/danferth/next-friday"
        >
          <GithubLogo className="h-5 w-auto text-gray-600  fill-current" />
          <span className="ml-2.5">Link to repository</span>
        </a>
      </p>
      <h1 className="text-base-content">What Is Countdown?</h1>
      <p>
        Countdown is a Jamstack website crafted with React using the Next.js
        framework. The site&apos;s core feature is to provide a countdown to a
        specific date and time. By default, it counts down to the next Friday at
        5:00 PM in your local timezone. You can customize the countdown to
        repeat weekly, monthly, yearly, or set a one-time countdown.
      </p>

      <blockquote>
        Instead of making someone sift through multiple repositories, Countdown
        efficiently demonstrates my capabilities in one comprehensive project.
      </blockquote>

      <h2>Why Build It?</h2>
      <p>
        Throughout my career, many of the impressive projects I&apos;ve built
        either use older tech stacks like <code>PHP/MySQL/Apache</code> or are
        for internal use, making them inaccessible. I created Countdown to
        showcase my skills using the modern stack of <code>React/Next.js</code>,
        aligning with current job market I&apos;d like to work in.
      </p>

      <h2 className="text-base-content">What Capabilities Am I Showing?</h2>
      <ul>
        <li>
          <b>API Requests:</b> Integrating external APIs, like fetching Kanye
          quotes.
        </li>
        <li>
          <b>Functionality:</b> Implementing a real-time countdown timer.
        </li>
        <li>
          <b>Global State Management:</b> Managing the countdown target
          date/time across the app.
        </li>
        <li>
          <b>Form Handling:</b> Allowing users to update the global state via
          forms.
        </li>
        <li>
          <b>Design:</b> Crafting a visually appealing interface beyond basic
          Bootstrap.
        </li>
        <li>
          <b>Open Source Contribution:</b> Maintaining a publicly accessible
          repository not tied to proprietary work.
        </li>
        {/* <li>
          <b>TypeScript:</b> Using TypeScript, a highly requested skill in
          current job postings.
        </li> */}
        <li>
          <b>Deployment:</b> Hosting the project for interactive use and
          demonstration.
        </li>
      </ul>

      <h2>What Did I Use To Build Countdown?</h2>
      <ul>
        <li>React</li>
        {/* <li>TypeScript</li> */}
        <li>Next.js</li>
        <li>Zustand</li>
        <li>Tailwind</li>
        <li>Daisy UI</li>
        <li>Luxon</li>
        <li>Framer Motion</li>
        <li>Few cups of coffee</li>
      </ul>
      <p>
        <a
          className="flex flex-row items-center justify-start"
          href="https://github.com/danferth/next-friday"
        >
          <GithubLogo className="h-5 w-auto text-gray-600  fill-current" />
          <span className="ml-2.5">Link to repository</span>
        </a>
      </p>
    </div>
  );
}
