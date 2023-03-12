import react from "react";
import Head from "next/head";
import { useState } from "react";
import styles from "./index.module.css";

export default function Home() {
  const [keywords, setKeywords] = useState("Habibi rénovation");
  const [name, setName] = useState("Habibi rénovation");
  const [services, setServices] = useState("peinture, rénovation intérieur, rénovation salle de bain");
  const [address, setAddress] = useState("");
  const [language, setLanguage] = useState("French");

  const [result, setResult] = useState();

  
  async function onSubmit(event) {
    event.preventDefault();
    /* if (loading) {
      return;
    } */
    //setLoading(true);
    //setResult('');
    const response = await fetch('/api/generate-seo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ keywords, name, services, address, language }),
    });
    const data = await response.json();
    setResult(data.result .replaceAll('\\n', ' <br />') );
    //setLoading(false);
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
          <label>keywords</label>
          <input
            type="text"
            name="keywords"
            placeholder="Enter the keywords here"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
          />
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
            placeholder="Enter the services here"
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
          <div className={styles.result}>{result}</div>
          
        </form>
      </main>
      
    </div>
  );
}
