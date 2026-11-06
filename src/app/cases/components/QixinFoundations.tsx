const icons = ['产业景气度分析', '产业图谱', '产业地图', '产业发展指数', '创新链', '供应链', '投融资', '重点企业', '重大项目', '强链补链', '产业政策', '产业风险', '产业动态', '产业研报', '区域对比', '企业管理'];
const colors = [
  ['primary', '主色', '#2258F4'], ['ink', '主要文字', '#1A1C24'],
  ['background', '浅色背景', '#FAFBFF'], ['secondary', '辅助文字', '#8A8D96'],
  ['border', '边框', '#CBCDD4'], ['success', '成功', '#0D800D'],
  ['warning', '警告', '#C8A74F'], ['danger', '危险', '#FF2828'],
];
export function QixinFoundations() {
  return <div className="qixin-foundations">
    <figure className="qixin-foundation-icons" aria-label="产业业务图标展示">
      <div>{icons.map((name, i) => <img key={name} src={`${import.meta.env.BASE_URL}images/qixin/icons/business-${i}.svg`} width={24} height={24} alt={name} loading="lazy" />)}</div>
    </figure>
    <figure className="qixin-foundation-colors" aria-label="代表性色彩与用途">
      <div>{colors.map(([key, label, hex]) => <div className="qixin-color-item" key={key}><span className={`qixin-color-swatch qixin-color-${key}`} aria-hidden="true" /><span>{label}<small>{hex}</small></span></div>)}</div>
    </figure>
  </div>;
}
