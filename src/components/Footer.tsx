import { Link } from 'react-router-dom';
import { navigation, site } from '../data/site';

export function Footer() {
  return (
    <footer className="footer container" id="site-footer">
      <div className="footer__top">
        <Link className="footer__headline" to="/contact">НАПИШИТЕ</Link>
        <a className="footer__telegram" href={site.telegram}>Telegram <span aria-hidden="true">↗</span></a>
      </div>
      <div className="footer__bottom mono">
        <span>© {new Date().getFullYear()} {site.name}</span>
        <nav className="footer__sitemap" aria-label="Карта сайта">
          <Link to="/">Главная</Link>
          {navigation.map((item) => <Link to={item.to} key={item.to}>{item.label}</Link>)}
        </nav>
        <span className="registration-mark" aria-hidden="true" />
      </div>
    </footer>
  );
}
