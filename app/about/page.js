import GithubLogo from "../../components/github";
export default function About() {
  return (
    <div className="prose ">
      <h1 className="">The reason I built this</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut scias me
        intellegere, primum idem esse dico voluptatem, quod ille don. Sed tamen
        omne, quod de re bona dilucide dicitur, mihi praeclare dici videtur.
        Paulum, cum regem Persem captum adduceret, eodem flumine invectio? Sin
        dicit obscurari quaedam nec apparere, quia valde parva sint, nos quoque
        concedimus; Graece donan, Latine voluptatem vocant. Duo Reges:
        constructio interrete.
      </p>
      <ul>
        <li>Needed a site that showed I am a competent React developer</li>
        <li>It needed to fetch an API (Kanye Quotes)</li>
        <li>
          it needed to show some sort of functionality and show knowledge in
          caculating somthing (time countdown)
        </li>
        <li>Show authorization skills (login)</li>
        <li>
          Database integration:
          <ul>
            <li>Prisma</li>
            <li>supabase db</li>
          </ul>
        </li>
        <li>It needed a repo that wasn&squot;t tied to work and was public</li>
        <li>
          Bonus:
          <ul>
            <li>Typscript</li>
            <li>Jest Testing added</li>
          </ul>
        </li>
        <li>
          <a
            className=" flex flex-row items-center justify-start"
            href="https://github.com/danferth/next-friday"
          >
            <span className="mr-2.5">Visit this repo on</span>
            <GithubLogo className="h-5 w-auto text-gray-600  fill-current" />
          </a>
        </li>
      </ul>
    </div>
  );
}
