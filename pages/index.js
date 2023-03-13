import seo from './seo';
import Link from "next/link";
import styles from "./index.module.css";

//export default seo


export default () => (
    <div>
      <style jsx global>{`
        body {
          background-color: #121213;
        }
      `}</style>
        <div className={styles.card}>
            <div className={styles.cardBody}>

                <h3>Modules</h3>

                <Link href="/seo">
                    <a>Go to SEO</a>
                </Link>
                <Link href="/alternative">
                    <a>Go to Alternative</a>
                </Link>
                <Link href="/article">
                    <a>Go to Article</a>
                </Link>
                <Link href="/keywords">
                    <a>Go to Keywords generator</a>
                </Link>
            </div>
        </div>
        
    </div>
);
