import { MagneticButton } from '../components/MagneticButton';
import { SplitHeadline } from '../components/SplitHeadline';
import { site } from '../data/site';

export function About() {
  return (
    <section className="page about-page container">
      <div className="page__eyebrow mono">Сурков Артём / о себе</div>
      <SplitHeadline lines={site.about.headline} />
      <div className="about-page__body">
        {site.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <MagneticButton to="/contact">Обсудить задачу</MagneticButton>
    </section>
  );
}
