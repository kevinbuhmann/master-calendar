export interface SimpleMap<T> { [key: string]: T; }

export function mapToArray<T extends { $key?: string }>(map: SimpleMap<T>): T[] {
  return Object.keys(map).map(key => Object.assign({ $key: key }, map[key]));
}

export function arrayToMap<T extends { $key?: string }>(array: T[]): SimpleMap<T> {
  return array
    .reduce((map, value) => { map[value.$key] = value; return map; }, { });
}
