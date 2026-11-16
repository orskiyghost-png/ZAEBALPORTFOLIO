import { Link } from 'react-router-dom';
import { MagneticButton } from '../components/MagneticButton';
import { ContactCta } from '../components/ContactCta';
import { ImageReveal } from '../components/ImageReveal';
import { Marquee } from '../components/Marquee';
import { ProjectCard } from '../components/ProjectCard';
import { Reveal } from '../components/Reveal';
import { SplitHeadline } from '../components/SplitHeadline';
import { projects } from '../data/projects';
import { site } from '../data/site';
import { useHeroParallax } from '../lib/hooks';

export function Home() {
  const heroRef = useHeroParallax();

  return (
    <>
      <section className="hero container" aria-label="Знакомство" ref={heroRef}>
        <div className="hero__composition">
          <div className="hero__editorial">
            <div className="hero__eyebrow mono">{site.home.eyebrow}</div>
            <div className="hero__headline-parallax">
              <SplitHeadline className="hero__headline" lines={site.home.headline} accentLine={2} />
            </div>
            <div className="hero__copy">
              <p className="hero__subline">{site.home.subline}</p>
              <div className="hero__actions">
                <MagneticButton to="/work">Смотреть работы</MagneticButton>
                <a className="text-link" href={site.telegram}>Написать в Telegram</a>
              </div>
            </div>
          </div>
          <div className="hero__visual">
            <div className="hero__image-parallax">
              <ImageReveal src="/assets/hero.jpeg" alt="Скульптура из алого лака на бумажном фоне" width={912} height={1152} eager />
            </div>
            <span className="hero__visual-cross hero__visual-cross--top" aria-hidden="true" />
            <span className="hero__visual-caption mono">Скульптура / алый лак / 2026</span>
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
          <span className="mono">03 / {String(projects.length).padStart(2, '0')}</span>
        </div>
        <div className="work-preview__list">
          {[0, 1, 4].map((index) => <ProjectCard key={projects[index].slug} project={projects[index]} index={index} />)}
        </div>
        <div className="section-end"><span className="mono">Пет-проекты / концепты / открытый код</span><Link className="text-link" to="/work">Все работы <span aria-hidden="true">↗</span></Link></div>
      </section>
      <section className="capabilities container section" aria-labelledby="capabilities-heading">
        <div className="section-heading"><h2 id="capabilities-heading">ЧТО ДЕЛАЮ</h2><span className="mono">От интерфейса до системы</span></div>
        <div className="capabilities__list">
          {site.home.capabilities.map((item, index) => (
            <div className="capabilities__row" key={item.name}>
              <span className="capabilities__index mono">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.name}</h3><p>{item.description}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="process container section" aria-labelledby="process-heading">
        <div className="section-heading"><h2 id="process-heading">КАК РАБОТАЮ</h2><span className="mono">Четыре шага до запуска</span></div>
        <ol className="process__list">
          {site.home.process.map((step, index) => (
            <li className="process__step" key={step.title}>
              <span className="process__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{step.title}</h3><p>{step.body}</p></div>
            </li>
          ))}
        </ol>
      </section>
      <section className="about-teaser container section" aria-labelledby="about-teaser-heading">
        <ImageReveal className="about-teaser__figure" src="/assets/about.jpeg" alt="Рабочий стол с бумагой, алюминием и алым объектом" width={1184} height={880} caption="Среда / форма / инструмент" />
        <Reveal className="about-teaser__body">
          <span className="mono">За работами — человек</span>
          <h2 id="about-teaser-heading">ДИЗАЙН И КОД.<br />В ОДНИХ РУКАХ.</h2>
          {site.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <Link className="text-link" to="/about">О себе <span aria-hidden="true">↗</span></Link>
        </Reveal>
      </section>
      <ContactCta />
    </>
  );
}
