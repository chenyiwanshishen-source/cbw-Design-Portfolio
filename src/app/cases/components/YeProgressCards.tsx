const icons = ['Clock01Icon', 'GitCommitIcon', 'CheckListIcon', 'UserGroupIcon'];

export function YeProgressCards({ items, note }: { items: { label: string; text: string }[]; note: string }) {
  return <figure className="ye-progress">
    <dl className="ye-progress-grid">{items.map((item, index) => <div className="ye-progress-card" key={item.label}>
      <span className="ye-progress-icon" aria-hidden="true"><img src={`/images/icons/hugeicons/${icons[index]}.svg`} alt="" /></span>
      <dt>{item.label}</dt>
      <dd>{item.text}</dd>
    </div>)}</dl>
    <figcaption>{note}</figcaption>
  </figure>;
}
