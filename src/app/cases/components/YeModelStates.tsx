import { AlertCircle, ArrowLeftRight, ChevronDown, RotateCcw, Settings, X } from 'lucide-react';

const states = [
  { title: '服务繁忙', message: '服务器这会儿有点忙，稍等片刻再试一下吧', retry: true, settings: 'switch' },
  { title: '网络超时', message: '等了好一会儿还没收到回复，可能是网络或服务器有点慢，再试一次吧', retry: true, settings: 'switch' },
  { title: '余额不足', message: '模型账户的余额好像用完了，充值后就能继续啦', retry: true, settings: 'settings' },
  { title: '密钥错误', message: 'API Key 好像不太对，去设置里检查一下吧', retry: false, settings: 'settings' },
  { title: '其他模型失败', message: '这次请求没成功，可以再试一次，详细原因放在下面了', retry: true, settings: null },
];

export function YeModelStates() {
  return <figure className="ye-model-states" aria-label="五种模型异常状态提示，按插件实际样式展示">
    {states.map(state => <div className="ye-model-state" key={state.title}>
      <p>{state.title}</p>
      <div className="ye-model-notice"><AlertCircle size={16} strokeWidth={2} aria-hidden="true" /><span>{state.message}</span>
        <div className="ye-model-notice-actions" aria-hidden="true"><ChevronDown size={16} strokeWidth={2} />{state.retry && <RotateCcw size={16} strokeWidth={2} />}{state.settings === 'switch' ? <ArrowLeftRight size={16} strokeWidth={2} /> : state.settings && <Settings size={16} strokeWidth={2} />}<X size={16} strokeWidth={2} /></div>
      </div>
    </div>)}
  </figure>;
}
