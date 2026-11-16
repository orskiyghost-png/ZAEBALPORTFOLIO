import { useState } from 'react';
import { SplitHeadline } from '../components/SplitHeadline';
import { site } from '../data/site';

export function Contact() {
  const [copyStatus, setCopyStatus] = useState('');

  const copyHandle = async () => {
    try {
      await navigator.clipboard.writeText(site.telegramHandle);
      setCopyStatus('Скопировано');
    } catch {
      setCopyStatus('Не удалось скопировать. Выделите @bigth и скопируйте вручную.');
    }
  };

  return (
    <section className="page contact-page container">
      <div className="page__eyebrow mono">Контакт / Сурков Артём</div>
      <SplitHeadline lines={[site.contact.heading]} />
      <p className="page__intro">{site.contact.body}</p>
      <p className="contact-page__availability"><span aria-hidden="true" />{site.contact.availability}</p>
      <div className="telegram-block">
        <a className="telegram-block__link" href={site.telegram} aria-label={`Открыть Telegram ${site.telegramHandle}`}>
          <span className="mono">Открыть Telegram</span>
          <span className="telegram-block__handle">{site.telegramHandle}</span>
          <span className="telegram-block__arrow" aria-hidden="true">↗</span>
        </a>
        <div className="telegram-block__copy-row">
          <button className="telegram-block__copy mono" type="button" onClick={() => { void copyHandle(); }}>Скопировать @bigth</button>
          <span className="telegram-block__status" role="status" aria-live="polite">{copyStatus}</span>
        </div>
      </div>
      <section className="contact-faq" aria-labelledby="faq-heading">
        <h2 id="faq-heading">ДО РАЗГОВОРА</h2>
        <div>{site.contact.faq.map((item) => <details className="contact-faq__item" key={item.question}><summary>{item.question}<span aria-hidden="true">+</span></summary><p>{item.answer}</p></details>)}</div>
      </section>
      <div className="contact-page__expectation"><span className="mono">Отвечаю в течение дня</span><p>Для начала достаточно сообщения. Детали, объём и следующий шаг обсудим в переписке.</p></div>
    </section>
  );
}
