import seo from './seo';
import Link from "next/link";

//export default seo

export default () => (
  <div>

    <style jsx global>{`
      body {
        background-color: black;
        color: white;
        align-items: center;
      }
    `}</style>

    Modules : 
    <Link href="/seo">
      <a>Go to SEO</a>
    </Link>
  </div>
);