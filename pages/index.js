import seo from './seo';
import pets from './pets';
import react from "react";
import Head from "next/head";

//export default seo

const AppLinks = () => {
    return (
      <ul>
        <li><a href="./pets">App</a></li>
        <li><a href="./seo">Seo</a></li>
        {/* add more links for other app files here */}
      </ul>
    )
  }
  
  ReactDOM.render(
    <>
      <Seo />
      <AppLinks />
      <App />
    </>,
    document.getElementById('root')
  );