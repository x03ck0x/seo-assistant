import seo from './seo';
import pets from './pets';

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