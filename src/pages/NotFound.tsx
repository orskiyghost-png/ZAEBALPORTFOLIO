import { MagneticButton } from '../components/MagneticButton';
import { SplitHeadline } from '../components/SplitHeadline';
import { site } from '../data/site';

export function NotFound() {
  return (
    <section className="page not-found container">
      <div className="page__eyebrow mono">404 <span className="not-found__mark" aria-hidden="true">+</span></div>
      <SplitHeadline lines={site.notFound.headline} />
      <p className="page__intro">{site.notFound.body}</p>
      <MagneticButton to="/">На главную</MagneticButton>
    </section>
  );
}
