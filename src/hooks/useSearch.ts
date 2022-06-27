// eslint-disable-next-line max-classes-per-file
import React from 'react';
import { Navigator, UNSAFE_NavigationContext, useLocation } from 'react-router-dom';

import { isEnumValue } from 'src/modules/enums';

let memorize: Search | null = null;
export default function useSearch(): Search {
  const { navigator } = React.useContext(UNSAFE_NavigationContext);
  const { search } = useLocation();
  if (!memorize || memorize.search !== search || memorize.navigator !== navigator) {
    memorize = new Search(search, navigator);
  }
  return memorize;
}

export function useSearchNavigate() {
  const { navigator } = React.useContext(UNSAFE_NavigationContext);
  return React.useCallback(
    (search: Record<string, string | null | number | Date | boolean | undefined>) => {
      const entries = Object.entries(search)
        .filter((x) => x[1] != null)
        .map(([k, v]) => [k, v instanceof Date ? v.getTime().toString() : String(v)]);
      navigator.push({ search: new URLSearchParams(entries).toString() });
    },
    [navigator],
  );
}

const PAGE_NUM_PARAM = 'current';

/**
 * 日期类型以 timestamp 储存在url中
 */
class Search {
  public params: URLSearchParams;

  constructor(public search: string, public navigator: Navigator) {
    this.params = new URLSearchParams(search);
  }

  public current() {
    return this.int(PAGE_NUM_PARAM, 1);
  }

  public id(name: string): string | null {
    return this.params.get(name);
  }

  public strOf<T extends string>(name: string, values: T[]): T | null;
  public strOf<T extends string>(name: string, values: T[], defaultValue: T): T;
  public strOf<T extends string>(name: string, values: T[], defaultValue?: T): T | null {
    const val = this.params.get(name);
    if (val != null && values.includes(val as T)) return val as T;
    return defaultValue ?? null;
  }

  public str(name: string): string | null {
    return this.params.get(name);
  }

  public has(name: string): boolean {
    return this.params.has(name);
  }

  public bool(name: string): boolean | null;
  public bool(name: string, defaultValue: boolean): boolean;
  public bool(name: string, defaultValue?: boolean): boolean | null {
    const v = this.params.get(name);
    if (v === 'true') return true;
    if (v === 'false') return false;
    return defaultValue ?? null;
  }

  public time(name: string): number | null;
  public time(name: string, defaultValue: number): number;
  public time(name: string, defaultValue?: number): number | null {
    const v = this.params.get(name);
    if (!v) return defaultValue ?? null;
    const k = Number(v);
    if (Number.isInteger(k)) return k;
    return defaultValue ?? null;
  }

  public int(name: string): number | null;
  public int(name: string, defaultValue: number): number;
  public int(name: string, defaultValue?: number): number | null {
    const v = this.params.get(name);
    if (!v) return defaultValue ?? null;
    const k = Number(v);
    if (Number.isInteger(k)) return k;
    return defaultValue ?? null;
  }

  public enumOf<T extends number>(name: string, values: T[]): T | null {
    const val = this.int(name);
    if (val != null && values.includes(val as T)) return val as T;
    return null;
  }

  public enum<T extends number>(name: string, enums: { [k: string]: T | string }): T | null;
  public enum<T extends number>(
    name: string,
    enums: { [k: string]: T | string },
    defaultValue: T,
  ): T;
  public enum<T extends number>(
    name: string,
    enums: { [k: string]: T | string },
    defaultValue?: T,
  ): T | null {
    const val = this.params.get(name);
    if (!val) return defaultValue ?? null;
    const i = Number(val);
    if (isEnumValue(i, enums)) return i;
    return defaultValue ?? null;
  }

  update(): SearchUpdater {
    return new SearchUpdater(this.params, this.navigator);
  }

  public navigate = (search: Record<string, string | number | Date | boolean | null>) => {
    const entries = Object.entries(search)
      .filter((x) => x[1] != null)
      .map(([k, v]) => [k, v instanceof Date ? v.getTime().toString() : String(v)]);
    this.navigator.push({ search: new URLSearchParams(entries).toString() });
  };
}

class SearchUpdater {
  private updates: URLSearchParams;

  constructor(params: URLSearchParams, private navigator: Navigator) {
    this.updates = new URLSearchParams(params);
  }

  public setIf(condition: boolean, name: string, value: number | Date | boolean | string | null) {
    if (condition) this.set(name, value);
    return this;
  }

  public set(object: Record<string, number | Date | boolean | string | null>): this;
  public set(name: string, value: number | Date | boolean | string | null): this;
  public set(
    name: string | Record<string, number | Date | boolean | string | null>,
    value?: number | Date | boolean | string | null,
  ): this {
    const { updates } = this;
    if (typeof name === 'object') {
      Object.entries(name).forEach(([key, val]) => {
        if (val == null) {
          updates.delete(key);
        } else if (val instanceof Date) {
          updates.set(key, val.getTime().toString());
        } else {
          updates.set(key, String(val));
        }
      });
    } else if (value == null) {
      updates.delete(name);
    } else if (value instanceof Date) {
      updates.set(name, value.getTime().toString());
    } else {
      updates.set(name, String(value));
    }
    return this;
  }

  public get(name: string): string | null {
    return this.updates.get(name);
  }

  public delete(name: string) {
    this.updates.delete(name);
    return this;
  }

  public removeCurrent() {
    this.updates.delete(PAGE_NUM_PARAM);
    return this;
  }

  public complete() {
    const { updates } = this;
    const search = updates.toString();
    this.navigator.push({ search: search ? `?${search}` : '' });
  }
}
