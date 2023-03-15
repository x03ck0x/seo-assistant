import react from "react";
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [user, setUser] = useState("Explain Sauron story");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  
  async function onSubmit(event) {
    event.preventDefault();
    
    if (loading) {
      return;
    }
    setLoading(true);

    try {

      const response = await fetch('/api/generate-test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user }),
      });
      const data = await response.json();
      setResult(data.result.replaceAll('\n', '<br />'));

    } catch (e) {
      alert('failed to submit, try again')
    } finally {
      setLoading(false);
    }
  }

  return (
    
    <div className="container">
      <Head>
        <title>Seo assistant</title>
        <link rel="icon" href="/skull.png" />
      </Head>

      <main className={styles.main}>
        <img src="/skull.png" className={styles.icon} />
        <h3>Beta 0.1</h3>
        <form onSubmit={onSubmit}>
          <label>Text</label>
          <input
            type="text"
            name="user"
            placeholder="Enter request"
            value={user}
            onChange={(e) => setUser(e.target.value)}
          />
         

          <input type="submit" value="Generate" />          
        </form>

        {loading && (
          <div>
            <h4>Working...</h4>
            { <img src="/barload.gif" className={styles.loading} width="50%" height="50%" /> }

          </div>
        )}
        {result && (
        <div className={styles.result2} 
        dangerouslySetInnerHTML={{ __html: result }}
        />
        )}
      </main>

      <style jsx global>{`
        body {
          background-color: #333;
          color: #fff !important;
        }
        p, h1, h2, h3, h4, h5, h6 {
          color: #fff !important;
        }
      `}</style>

    </div>
  );
}


