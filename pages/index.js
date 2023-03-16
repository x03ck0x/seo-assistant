import seo from './seo';
import alternative from './alternative';
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
                <Link href="/youtubemp3.html">
                    <a>Go to Chatgpt 4</a>
                </Link>
                <Link href="/test">
                    <a>Go to DAVINCI 003 </a>
                </Link>
            </div>
        </div>
        
    </div>
);
