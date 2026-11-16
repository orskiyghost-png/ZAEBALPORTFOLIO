import { Link, useParams } from 'react-router-dom';
import { Reveal } from '../components/Reveal';
import { ImageReveal } from '../components/ImageReveal';
import { SplitHeadline } from '../components/SplitHeadline';
import { getProject, projects } from '../data/projects';
import { NotFound } from './NotFound';

export function Project() {
  const { slug } = useParams<{ slug: string }>();
  const project = getProject(slug);

  if (!project) return <NotFound />;

  const nextProject = projects[(projects.indexOf(project) + 1) % projects.length];
  const facts = [
    ['Тип', project.type], ['Год', String(project.year)], ['Роль', project.role],
    ['Стек', project.stack.join(', ')], ['Статус', project.type],
  ];

  return (
    <article className="page project-page container">
      <Link className="page__back mono text-link" to="/work"><span aria-hidden="true">← </span>Все работы</Link>
      <div className="page__eyebrow mono">{project.type} / {project.year}</div>
      <SplitHeadline lines={[project.title.toLocaleUpperCase('ru-RU')]} />
      <p className="project-page__subtitle">{project.subtitle}</p>
      <p className="page__intro">{project.oneLiner}</p>
      <ImageReveal className="project-page__cover" src={project.cover} alt={`Визуальная композиция проекта «${project.title}»`} width={1248} height={832} caption={`${project.year} / ${project.stack.join(' / ')}`} eager />
      <dl className="project-page__facts">
        {facts.map(([label, value]) => <div key={label}><dt className="mono">{label}</dt><dd>{value}</dd></div>)}
      </dl>
      <section className="project-section" aria-labelledby="problem-heading">
        <h2 id="problem-heading">Задача</h2><Reveal><p>{project.problem}</p></Reveal>
      </section>
      <section className="project-section" aria-labelledby="approach-heading">
        <h2 id="approach-heading">Подход</h2><p>{project.approach}</p>
      </section>
      <section className="project-section project-section--decisions" aria-labelledby="decisions-heading">
        <h2 id="decisions-heading">Решения</h2>
        <ol className="project-decisions">
          {project.decisions.map((decision, index) => (
            <li className="project-decisions__item" key={decision.title}>
              <span className="project-decisions__number mono">{String(index + 1).padStart(2, '0')}</span>
              <div><h3>{decision.title}</h3><p>{decision.body}</p></div>
            </li>
          ))}
        </ol>
      </section>
      <section className="project-section project-section--question" aria-labelledby="question-heading">
        <h2 id="question-heading">Что проверяет</h2>
        <div><p className="project-page__question">{project.question}</p>{project.note && <p className="project-page__note">{project.note}</p>}</div>
      </section>
      <section className="project-section" aria-labelledby="stack-heading">
        <h2 id="stack-heading">Стек</h2>
        <ul className="chips">{project.stack.map((tool) => <li className="chip mono" key={tool}>{tool}</li>)}</ul>
      </section>
      <nav className="next-project" aria-label="Следующая работа">
        <Link className="next-project__link" to={`/work/${nextProject.slug}`}>
          <img src={`${import.meta.env.BASE_URL}${nextProject.cover.slice(1)}`} alt={`Обложка проекта «${nextProject.title}»`} width="1248" height="832" loading="lazy" decoding="async" />
          <div><span className="mono">Следующая работа</span><h2>{nextProject.title}</h2><p>{nextProject.subtitle}</p></div>
          <span className="next-project__arrow" aria-hidden="true">↗</span>
        </Link>
      </nav>
    </article>
  );
}
