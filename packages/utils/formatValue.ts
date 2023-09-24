export function convertProxyToNormal(proxyObject: any) {
  const normalObject: { [key: string]: any } = {}; // 添加索引签名
  for (const key in proxyObject) {
    const value = proxyObject[key];
    if (Array.isArray(value)) {
      normalObject[key] = value.map((item) => {
        if (typeof item === 'object' && item !== null) {
          return convertProxyToNormal(item);
        }
        return item;
      });
    } else if (typeof value === 'object' && value !== null) {
      normalObject[key] = convertProxyToNormal(value);
    } else {
      normalObject[key] = value;
    }
  }
  return normalObject;
}

export function replaceEmptyValuesWithNull(obj: Record<string, any>): void {
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      if (
        obj[key] === '' ||
        obj[key] === undefined ||
        obj[key] === null ||
        obj[key] === 'null' ||
        obj[key] === 'undefined'
      ) {
        obj[key] = null;
      }
    }
  }
}
