export type ProjectType = 'Пет-проект' | 'Концепт' | 'Концепт-исследование' | 'Open source';

export interface Project {
  slug: string;
  title: string;
  subtitle: string;
  type: ProjectType;
  year: number;
  role: string;
  oneLiner: string;
  problem: string;
  approach: string;
  stack: string[];
  decisions: { title: string; body: string }[];
  cover: string;
}

export const projectTypes = ['Все', 'Пет-проект', 'Концепт', 'Open source'] as const;

export const projects: Project[] = [
  {
    slug: 'ritm',
    title: 'Ритм',
    subtitle: 'трекер привычек',
    type: 'Пет-проект',
    year: 2025,
    role: 'Дизайн, фронтенд, PWA',
    oneLiner: 'Трекер привычек, который работает без сети и не требует аккаунта.',
    problem: 'Большинство трекеров требуют регистрации и связи с сервером. Мне нужен был инструмент, который открывается за секунду и не теряет данные в метро.',
    approach: 'Локальное хранилище вместо бэкенда, рукописная сетка вместо списка, серия как главная метрика.',
    stack: ['React', 'TypeScript', 'IndexedDB', 'Workbox'],
    decisions: [
      { title: 'Данные только локально.', body: 'IndexedDB и экспорт в JSON. Приватность по умолчанию, нулевая стоимость сервера.' },
      { title: 'Сетка вместо списка.', body: 'Месяц виден целиком, серия читается как календарь, а не как лента.' },
      { title: 'Офлайн как основной режим.', body: 'Service worker кеширует оболочку, приложение стартует быстрее, чем успевает появиться спиннер.' },
    ],
    cover: '/assets/work/ritm.jpg',
  },
  {
    slug: 'kontur',
    title: 'Контур',
    subtitle: 'конструктор внутренних инструментов',
    type: 'Концепт',
    year: 2025,
    role: 'Продуктовый дизайн, фронтенд, архитектура',
    oneLiner: 'Собирает админки и внутренние панели из блоков, без кода и без отдельного бэкенда на каждый случай.',
    problem: 'Небольшим командам нужны внутренние панели, но нанимать разработчика на каждую таблицу дорого.',
    approach: 'Схема данных как единственный источник правды: из неё генерируются форма, таблица и API.',
    stack: ['React', 'TypeScript', 'tRPC', 'PostgreSQL', 'Drizzle'],
    decisions: [
      { title: 'Схема первична', body: '' },
      { title: 'Один экран — один инструмент', body: '' },
      { title: 'Права на уровне поля', body: '' },
    ],
    cover: '/assets/work/kontur.jpg',
  },
  {
    slug: 'smeta',
    title: 'Смета',
    subtitle: 'расчёт ремонта по фото',
    type: 'Концепт-исследование',
    year: 2024,
    role: 'AI-инженерия, прототип',
    oneLiner: 'Загружаешь фото комнаты — получаешь черновую смету материалов и работ.',
    problem: 'Первая оценка ремонта занимает дни: замеры, прайсы, переписка. Большая часть работы — распознавание типовых ситуаций.',
    approach: 'Vision-модель размечает поверхности, прайс-лист считает стоимость, человек подтверждает спорные зоны.',
    stack: ['Python', 'FastAPI', 'Vision API', 'PostgreSQL'],
    decisions: [
      { title: 'Модель предлагает, человек подтверждает', body: '' },
      { title: 'Прайс отдельно от модели', body: '' },
      { title: 'Погрешность показывается явно', body: '' },
    ],
    cover: '/assets/work/smeta.jpg',
  },
  {
    slug: 'tikhiy-chas',
    title: 'Тихий час',
    subtitle: 'аудиогид по городу',
    type: 'Пет-проект',
    year: 2024,
    role: 'Дизайн, фронтенд, звук',
    oneLiner: 'Прогулка по городу с генеративным звуком, который меняется от места и времени.',
    problem: 'Аудиогиды говорят одинаково для всех и не замечают, что вокруг.',
    approach: 'Маршрут как партитура: точки на карте меняют плотность и высоту синтеза.',
    stack: ['Web Audio API', 'MapLibre', 'React'],
    decisions: [
      { title: 'Звук генерируется в браузере', body: '' },
      { title: 'Карта без подписей', body: '' },
      { title: 'Тишина — часть партитуры', body: '' },
    ],
    cover: '/assets/work/tikhiy-chas.jpg',
  },
  {
    slug: 'atlas',
    title: 'Атлас',
    subtitle: 'каталог архитектурных бюро',
    type: 'Концепт',
    year: 2024,
    role: 'Дизайн, вёрстка, фронтенд',
    oneLiner: 'Каталог бюро, где проект показывается разворотом, а не карточкой в сетке.',
    problem: 'Портфолио архитекторов живут в PDF. В вебе они теряют масштаб и воздух.',
    approach: 'Журнальная сетка, крупные планы, медленные переходы между разворотами.',
    stack: ['Astro', 'TypeScript', 'CMS'],
    decisions: [
      { title: 'Разворот вместо страницы', body: '' },
      { title: 'Один проект на экран', body: '' },
      { title: 'Типографика несёт навигацию', body: '' },
    ],
    cover: '/assets/work/atlas.jpg',
  },
  {
    slug: 'puls',
    title: 'Пульс',
    subtitle: 'мониторинг упоминаний',
    type: 'Open source',
    year: 2023,
    role: 'Фронтенд, интеграция LLM',
    oneLiner: 'Собирает упоминания бренда и раскладывает их по тону и теме с помощью LLM.',
    problem: 'Ручной мониторинг соцсетей не масштабируется, а обычный поиск по словам не понимает сарказм.',
    approach: 'Поток упоминаний, батч-разметка моделью, дашборд с фильтрами по тону и источнику.',
    stack: ['React', 'Node', 'SSE', 'LLM API'],
    decisions: [
      { title: 'Разметка батчами', body: '' },
      { title: 'Стриминг в дашборд', body: '' },
      { title: 'Каждое решение модели объяснимо', body: '' },
    ],
    cover: '/assets/work/puls.jpg',
  },
];

export function getProject(slug: string | undefined): Project | undefined {
  return projects.find((project) => project.slug === slug);
}
