import react from "react";
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [text, setText] = useState("");
  const [language, setLanguage] = useState("French");

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState();
  
  async function onSubmit(event) {
    event.preventDefault();
    
    if (loading) {
      return;
    }
    setLoading(true);

    try {

      const response = await fetch('/api/generate-alt', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text, language }),
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
        <title>Seo Text Alternative</title>
        <link rel="icon" href="/skull.png" />
      </Head>

      <main className={styles.main}>
        <img src="/skull.png" className={styles.icon} />
        <h3>Seo Text Alternative</h3>
        <form onSubmit={onSubmit}>
          <label>Text</label>
          <textarea
            //type="textarea"
            name="text"
            placeholder="Enter the text here"
            rows={10}
            value={text}
            onChange={(e) => setText(e.target.value)}
          ></textarea>
          <label>language</label>
          <select
            name="language"
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
          >
            <option value="French">French</option>
            <option value="English">English</option>
            <option value="Dutch">Dutch</option>
          </select>

          <input type="submit" value="Generate" />          
        </form>

        {loading && (
          <div>
            <h4>Working on it</h4>
            { <img src="/loading-1.gif.gif" className={styles.loading} /> }

          </div>
        )}
        {result && (
        <div className={styles.result} 
        dangerouslySetInnerHTML={{ __html: result }}
        />
        )}
      </main>

      <style jsx global>{`
        body {
          background-color: #212129;
          color: #fff !important;
        }
        p, h1, h2, h3, h4, h5, h6 {
          color: #fff !important;
        }
      `}</style>

    </div>
  );
}


