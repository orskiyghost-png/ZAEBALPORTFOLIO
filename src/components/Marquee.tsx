interface MarqueeProps {
  items?: readonly string[];
}

export function Marquee({ items = ['Веб', 'Приложения', 'Автоматизация', 'AI-инструменты'] }: MarqueeProps) {
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee__track mono">
        {[0, 1].map((copy) => (
          <span className="marquee__group" key={copy}>
            {[0, 1].flatMap((repeat) => items.map((item) => (
              <span className="marquee__item" key={`${repeat}-${item}`}>
                {item}<span className="marquee__asterisk">*</span>
              </span>
            )))}
          </span>
        ))}
      </div>
    </div>
  );
}
