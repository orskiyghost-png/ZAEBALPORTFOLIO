import { site } from '../data/site';
import { MagneticButton } from './MagneticButton';
import { Reveal } from './Reveal';

interface ContactCtaProps {
  toContact?: boolean;
}

export function ContactCta({ toContact = false }: ContactCtaProps) {
  return (
    <section className="contact-cta container section" aria-labelledby="contact-cta-heading">
      <Reveal>
        <div className="contact-cta__top mono"><span>Следующий проект</span><span aria-hidden="true">↗</span></div>
        <h2 id="contact-cta-heading">{site.contact.cta}</h2>
        <div className="contact-cta__bottom">
          <p>{site.contact.ctaBody}</p>
          <div className="contact-cta__action">
            {toContact ? <MagneticButton to="/contact">Обсудить задачу</MagneticButton> : <MagneticButton href={site.telegram}>Написать в Telegram</MagneticButton>}
            <span className="mono">Отвечаю в течение дня</span>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
