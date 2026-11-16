import { MagneticButton } from '../components/MagneticButton';
import { SplitHeadline } from '../components/SplitHeadline';
import { site } from '../data/site';

export function NotFound() {
  return (
    <section className="page not-found container">
      <div className="page__eyebrow mono">Навигация / страница не найдена</div>
      <div className="not-found__number" aria-hidden="true">404<span className="not-found__registration">+</span></div>
      <SplitHeadline lines={site.notFound.headline} />
      <p className="page__intro">{site.notFound.body}</p>
      <div className="not-found__actions"><MagneticButton to="/">На главную</MagneticButton><a className="text-link" href={site.telegram}>Написать в Telegram <span aria-hidden="true">↗</span></a></div>
    </section>
  );
}
