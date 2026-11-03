// Keep words intact while leaving the browser free to choose line endings.
const segmenter = new Intl.Segmenter('zh-CN', { granularity: 'word' });
const terms = /(启信产业大脑|自定义产业链|产业链|产业大脑|启信宝|组件库|组件|招商|设计师|工作台|业务概览|图谱|复用|页面|模块|溯源率|提示词|低保真|核查|后续|迁出|权限绑定|项目反思|报告联动|AI 报告平台|Figma 连接器|Visual Code Canvas|\d+(?:[.~–—]\d+)?\s*(?:分钟|小时|像素|个月|周|天|年|位|个|次|%))/g;

export function ReadingText({ text }: { text: string }) {
  return <>{text.split(terms).map((part, index) => index % 2
    ? <span className="reading-word" key={index}>{part}</span>
    : Array.from(segmenter.segment(part), ({ segment, index: offset, isWordLike }) => isWordLike
      ? <span className="reading-word" key={`${index}-${offset}`}>{segment}</span>
      : segment))}</>;
}
