import { ContactCta } from '../components/ContactCta';
import { ImageReveal } from '../components/ImageReveal';
import { SplitHeadline } from '../components/SplitHeadline';
import { site } from '../data/site';

export function About() {
  return (
    <>
    <section className="page about-page container">
      <div className="page__eyebrow mono">Сурков Артём / о себе</div>
      <SplitHeadline lines={site.about.headline} accentLine={2} />
      <div className="about-page__body">
        {site.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </div>
      <ImageReveal className="about-page__portrait" src="/assets/about.jpeg" alt="Натюрморт рабочего стола: бумага, алюминий и алый объект" width={1184} height={880} caption="Рабочий стол / бумага, алюминий, алый" eager />
      <section className="about-timeline" aria-labelledby="timeline-heading">
        <div className="section-heading"><h2 id="timeline-heading">ПО ПУТИ</h2><span className="mono">2021—2025</span></div>
        <ol className="about-timeline__list">
          {site.about.timeline.map((item) => <li key={item.year}><span className="about-timeline__year mono">{item.year}</span><h3>{item.title}</h3><p>{item.body}</p></li>)}
        </ol>
      </section>
      <section className="principles" aria-labelledby="principles-heading">
        <div className="section-heading"><h2 id="principles-heading">ОПОРНЫЕ ТОЧКИ</h2></div>
        {site.about.principles.map((principle) => <div className="principles__item" key={principle.title}><h3>{principle.title}</h3><p>{principle.body}</p></div>)}
      </section>
      <section className="tools" aria-labelledby="tools-heading">
        <div className="section-heading"><h2 id="tools-heading">ИНСТРУМЕНТЫ</h2><span className="mono">Под задачу, не наоборот</span></div>
        <dl className="tools__list">
          {site.about.tools.map((toolset) => <div key={toolset.group}><dt className="mono">{toolset.group}</dt><dd><ul className="chips">{toolset.items.map((tool) => <li className="chip mono" key={tool}>{tool}</li>)}</ul></dd></div>)}
        </dl>
      </section>
    </section>
    <ContactCta toContact />
    </>
  );
}
