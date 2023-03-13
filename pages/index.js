import seo from './seo';
import Link from "next/link";

//export default seo

export default (seo) => (
  <div>

    <style jsx global>{`
      body {
        background-color: black;
      }
    `}</style>

    Modules : 
    <Link href="/seo">
      <a>Go to SEO</a>
    </Link>
  </div>
);