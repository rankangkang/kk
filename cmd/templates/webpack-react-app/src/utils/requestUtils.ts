// example示例
async function request<T>(method: string, url: string, data?: any) {
  let res = await fetch(url, {
    method,
    body: data
  })
  let json: T = await res.json();
  return json
}

export function post<T>(url: string, data: string) {
  let res = request<T>('POST', url, data);
  return res;
}