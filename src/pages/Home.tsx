import { Link } from 'react-router-dom';
import { MagneticButton } from '../components/MagneticButton';
import { Marquee } from '../components/Marquee';
import { SplitHeadline } from '../components/SplitHeadline';
import { projects } from '../data/projects';
import { site } from '../data/site';

export function Home() {
  return (
    <>
      <section className="hero container" aria-label="Знакомство">
        <div className="hero__eyebrow mono">{site.home.eyebrow}</div>
        <SplitHeadline className="hero__headline" lines={site.home.headline} accentLine={2} />
        <div className="hero__bottom grid">
          <div className="hero__copy">
            <p className="hero__subline">{site.home.subline}</p>
            <MagneticButton to="/work">Смотреть работы</MagneticButton>
          </div>
          <div className="hero__visual" role="img" aria-label="Место для скульптуры — визуальный эскиз">
            <span className="hero__visual-cross hero__visual-cross--top" aria-hidden="true" />
            <span className="hero__visual-form" aria-hidden="true" />
            <span className="hero__visual-caption mono">Форма в разработке</span>
            <span className="hero__visual-cross hero__visual-cross--bottom" aria-hidden="true" />
          </div>
        </div>
        <div className="hero__meta mono">
          <span>{site.home.availability}</span>
          <span>{site.home.response}</span>
          <a href="#selected-work" aria-label="Перейти к избранным работам">Листайте ниже <span aria-hidden="true">↓</span></a>
        </div>
      </section>
      <Marquee />
      <section className="work-preview container section" id="selected-work" aria-labelledby="selected-heading">
        <div className="section-heading">
          <h2 id="selected-heading">{site.home.selectedHeading}</h2>
          <span className="mono">{String(projects.length).padStart(2, '0')} работ</span>
        </div>
        <p className="work-preview__intro">{site.work.intro}</p>
        <Link className="text-link" to="/work">Открыть все работы <span aria-hidden="true">↗</span></Link>
      </section>
    </>
  );
}
