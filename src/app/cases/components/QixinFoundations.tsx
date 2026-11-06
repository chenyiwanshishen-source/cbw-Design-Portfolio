const icons = ['产业景气度分析', '产业图谱', '产业地图', '产业发展指数', '创新链', '供应链', '投融资', '重点企业', '重大项目', '强链补链', '产业政策', '产业风险', '产业动态', '产业研报', '区域对比', '企业管理', '搜索', '产业集群', '下载', '帮助', '关联列表', '消息通知', '关系触达', '删除'];
const colorStacks = [
  [['purple-light', '#D7B0FF'], ['purple-mid', '#B973FF'], ['purple-deep', '#9132F0']],
  [['orange-light', '#FFAF94'], ['orange-mid', '#FF8157'], ['orange-deep', '#FD5219']],
];
export function QixinFoundations() {
  return <div className="qixin-foundations">
    <figure className="qixin-foundation-icons" aria-label="产业业务图标展示">
      <div>{icons.map((name, i) => <img key={name} src={`${import.meta.env.BASE_URL}images/qixin/icons/business-${i}.svg`} width={24} height={24} alt={name} loading="lazy" />)}</div>
    </figure>
    <figure className="qixin-foundation-colors" aria-label="代表性色彩与用途">
      <div className="qixin-palette-card qixin-palette-stacks" aria-label="蓝色、紫色和橙色色阶">{colorStacks.map((stack, row) => <div className="qixin-palette-stack" key={row}>{stack.map(([key, hex]) => <div className={`qixin-palette-tile qixin-color-${key}`} key={key}><span>{hex}</span></div>)}</div>)}</div>
      <div className="qixin-naming-card" aria-label="真实颜色变量命名与引用关系">
        <div className="qixin-naming-head"><span>色值</span><span>基础色</span><span>语义色</span><span>组件色</span></div>
        {[
          ['primary', '#2258F4', '颜色/基础/蓝色/500', '颜色/背景/操作/主要', '组件/按钮/背景/主要'],
          ['ink', '#1A1C24', '颜色/基础/中性灰/900', '颜色/文本/主要', '组件/按钮/文字/一般实心'],
        ].map(([color, ...steps]) => <div className="qixin-naming-chain" key={color}>{steps.map((step, i) => <div key={step}><span className={`qixin-naming-dot qixin-color-${color}`} aria-hidden="true" /><span>{step}</span>{i < 3 && <b aria-hidden="true">→</b>}</div>)}</div>)}
      </div>
    </figure>
  </div>;
}
