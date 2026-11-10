import { intro } from './content/zh';

export function Contact() {
  return <section aria-labelledby="contact-title" className="home-section home-contact">
    <h2 id="contact-title" className="text-h2 font-normal">保持联系</h2>
    <dl className="home-contact-details">
      <div className="home-contact-item">
        <dt className="text-body font-medium">邮箱</dt>
        <dd className="text-body text-text-secondary"><a className="home-inline" href={`mailto:${intro.email}`}>{intro.email}</a></dd>
      </div>
      <div className="home-contact-item">
        <dt className="text-body font-medium">微信</dt>
        <dd className="text-body text-text-secondary select-text">chenbw0610</dd>
      </div>
      <div className="home-contact-item">
        <dt className="text-body font-medium">毕业院校</dt>
        <dd className="text-body text-text-secondary">郑州轻工业大学</dd>
      </div>
      <div className="home-contact-item">
        <dt className="text-body font-medium">专业</dt>
        <dd className="text-body text-text-secondary">工业设计</dd>
      </div>
    </dl>
  </section>;
}
