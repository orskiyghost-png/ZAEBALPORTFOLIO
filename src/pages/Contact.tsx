import { MagneticButton } from '../components/MagneticButton';
import { SplitHeadline } from '../components/SplitHeadline';
import { site } from '../data/site';

export function Contact() {
  return (
    <section className="page contact-page container">
      <div className="page__eyebrow mono">{site.contact.availability}</div>
      <SplitHeadline lines={[site.contact.heading]} />
      <p className="page__intro">{site.contact.body}</p>
      <MagneticButton href={site.telegram}>Написать {site.telegramHandle}</MagneticButton>
    </section>
  );
}
