import { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { usePointerFine, useReducedMotion } from '../lib/hooks';
import { springSoft } from '../lib/motion';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const [active, setActive] = useState(false);
  const reducedMotion = useReducedMotion();
  const pointerFine = usePointerFine();

  return (
    <motion.article
      className="work-card"
      animate={{ y: active && !reducedMotion ? -6 : 0 }}
      transition={springSoft}
      onPointerEnter={() => { if (pointerFine) setActive(true); }}
      onPointerLeave={() => setActive(false)}
      onFocus={() => setActive(true)}
      onBlur={() => setActive(false)}
    >
      <Link className="work-card__link" to={`/work/${project.slug}`}>
        <div className="work-card__image">
          <img
            src={`${import.meta.env.BASE_URL}${project.cover.slice(1)}`}
            alt={`Визуальная композиция проекта «${project.title}»`}
            width="1248" height="832" loading="lazy" decoding="async"
          />
          <span className="work-card__type mono">{project.type} / {project.year}</span>
        </div>
        <div className="work-card__body">
          <span className="work-card__index mono">{String(index + 1).padStart(2, '0')}</span>
          <div className="work-card__heading">
            <h3>{project.title}</h3>
            <p className="work-card__subtitle">{project.subtitle}</p>
          </div>
          <span className="work-card__arrow" aria-hidden="true">↗</span>
          <p className="work-card__description">{project.oneLiner}</p>
          <ul className="chips" aria-label="Стек проекта">
            {project.stack.map((tool) => <li className="chip mono" key={tool}>{tool}</li>)}
          </ul>
        </div>
      </Link>
    </motion.article>
  );
}
