import { useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { SplitHeadline } from '../components/SplitHeadline';
import { projects, projectTypes, type Project } from '../data/projects';
import { site } from '../data/site';
import { usePointerFine, useReducedMotion } from '../lib/hooks';
import { motionTiming, springSoft } from '../lib/motion';

type Filter = typeof projectTypes[number];

function matchesFilter(project: Project, filter: Filter) {
  return filter === 'Все' || (filter === 'Концепт' ? project.type.startsWith('Концепт') : project.type === filter);
}

export function Work() {
  const [filter, setFilter] = useState<Filter>('Все');
  const [focusedSlug, setFocusedSlug] = useState<string | null>(null);
  const reducedMotion = useReducedMotion();
  const pointerFine = usePointerFine();
  const visibleProjects = projects.filter((project) => matchesFilter(project, filter));
  const years = projects.map((project) => project.year);

  return (
    <section className="page work-page container" aria-label="Все работы">
      <div className="page__eyebrow mono">{String(projects.length).padStart(2, '0')} работ / {Math.min(...years)}—{Math.max(...years)}</div>
      <SplitHeadline lines={[site.work.heading]} />
      <p className="page__intro">{site.work.intro}</p>
      <div className="work-filters" role="group" aria-label="Фильтр по типу проекта">
        {projectTypes.map((type) => (
          <button className="work-filters__button" type="button" key={type} aria-pressed={filter === type} aria-controls="project-list" onClick={() => setFilter(type)}>
            {type}<span className="mono">{String(projects.filter((project) => matchesFilter(project, type)).length).padStart(2, '0')}</span>
          </button>
        ))}
      </div>
      <p className="sr-only" role="status">Показано проектов: {visibleProjects.length}</p>
      <motion.ul className="project-index" id="project-list" layout={!reducedMotion}>
        <AnimatePresence initial={false}>
        {visibleProjects.map((project) => (
          <motion.li
            className="project-index__item" key={project.slug}
            layout={!reducedMotion}
            initial={{ opacity: 0, y: reducedMotion ? 0 : 12 }}
            animate={{ opacity: 1, y: focusedSlug === project.slug && !reducedMotion ? -6 : 0 }}
            exit={{ opacity: 0 }}
            whileHover={pointerFine && !reducedMotion ? { y: -6 } : undefined}
            transition={{ layout: springSoft, y: springSoft, opacity: { duration: reducedMotion ? motionTiming.reduced : motionTiming.shift } }}
          >
            <Link className="project-index__link" to={`/work/${project.slug}`} onFocus={() => setFocusedSlug(project.slug)} onBlur={() => setFocusedSlug(null)}>
              <span className="project-index__number mono">{String(projects.indexOf(project) + 1).padStart(2, '0')}</span>
              <img className="project-index__thumbnail" src={`${import.meta.env.BASE_URL}${project.cover.slice(1)}`} alt={`Обложка проекта «${project.title}»`} width="1248" height="832" loading="lazy" decoding="async" />
              <span className="project-index__title">{project.title}<span>{project.subtitle}</span></span>
              <span className="project-index__type mono">{project.type}</span>
              <span className="project-index__year mono">{project.year}</span>
              <span className="project-index__arrow" aria-hidden="true">↗</span>
              <span className="project-index__preview" aria-hidden="true"><img src={`${import.meta.env.BASE_URL}${project.cover.slice(1)}`} alt="" width="1248" height="832" loading="lazy" decoding="async" /></span>
            </Link>
          </motion.li>
        ))}
        </AnimatePresence>
      </motion.ul>
      {visibleProjects.length === 0 && <p className="page__intro">В этой подборке пока нет проектов. Выберите «Все».</p>}
    </section>
  );
}
