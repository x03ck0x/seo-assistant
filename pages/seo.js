import react from "react";
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [name, setName] = useState("Habibi toiture à Namur");
  const [services, setServices] = useState("");
  const [address, setAddress] = useState("");
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

      const response = await fetch('/api/generate-seo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, services, address, language }),
      });
      const data = await response.json();
      setResult(data.result.replaceAll('\n', '<br />'));

    } catch (e) {
      alert('failed to submit, try again bish')
    } finally {
      setLoading(false);
    }
  }

  return (
    
    <div className="container">
      <Head>
        <title>OpenAI Quickstart</title>
        <link rel="icon" href="/skull.png" />
      </Head>

      <main className={styles.main}>
        <img src="/skull.png" className={styles.icon} />
        <h3>SEO generator 1.0</h3>
        <form onSubmit={onSubmit}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            placeholder="Enter the name here"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <label>Services</label>
          <input
            type="text"
            name="services"
            placeholder="Services here"
            value={services}
            onChange={(e) => setServices(e.target.value)}
          />
          
          <label>Address</label>
          <select
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          >
            <option value=""></option>
            <option value="Belgique">Belgique</option>
            <option value="France">France</option>
          </select>
          
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
            <h4>Working on the best SEO</h4>
            { <img src="/css-load.gif" className={styles.loading} /> }

          </div>
        )}
        {result && (
        <div className={styles.result} 
        dangerouslySetInnerHTML={{ __html: result }}
        />
        )}
      </main>
      
    </div>
  );
}


