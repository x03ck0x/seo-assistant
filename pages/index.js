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
      <a> Go to SEO</a>
    </Link><br/>
    <Link href="/alternative">
      <a> Go to Alternative</a>
    </Link><br/>
    <Link href="/article">
      <a> Go to Article</a>
    </Link>

  </div>
);