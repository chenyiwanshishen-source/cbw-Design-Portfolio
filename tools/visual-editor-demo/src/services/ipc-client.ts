// Portfolio adapter: no sockets, backend or filesystem writes.
export type IPCMessageCallback = (payload: any) => void;
export class IPCClientService {
 constructor(..._args: any[]) {}
 connect(): Promise<void> { return Promise.reject(new Error('前端演示不连接后端')); }
 on(..._args: any[]) {} off(..._args: any[]) {}
 sendNotification(..._args: any[]) {}
 sendRequest<T = any>(..._args: any[]): Promise<T> { return Promise.reject(new Error('前端演示不提供源码操作')); }
 disconnect() {} getIsConnected() { return false; }
}
