import { Handler, Request, Router } from 'express';
import { Random } from 'mockjs';
import crptyo from 'node:crypto';

import { Page } from '../src/models/base';

export const uuid = () => crptyo.randomUUID();

export function delay(ms: number): Handler {
  return (_req, _res, next) => {
    if (ms) setTimeout(next, ms);
    else next();
  };
}

export function throwError({
  message,
  status,
  work,
}: {
  message: string;
  status: number;
  work: boolean;
}): Handler {
  return (_req, res, next) => {
    if (work) {
      res
        .status(status)
        .type('json')
        .send(JSON.stringify({ error: message }));
    } else {
      next();
    }
  };
}

export function page<T>(instance: () => T, req: Request, defaultTotal?: number): Page<T> {
  const current = parseInt((req.query.current as string) || '1', 10);
  const size = parseInt((req.query.size as string) || '10', 10);
  const count = parseInt(req.query.total as string, 10);
  const total = count >= 0 ? count : defaultTotal || Random.integer(0, 10000);
  const rowLength = Math.min(Math.max(count - (current - 1) * size, 0), size);
  return { total, rows: list(instance, rowLength) };
}

export function list<T>(instance: () => T, size?: number | string): T[] {
  return Array(Number(size || 10))
    .fill(0)
    .map(instance);
}

export function randomEnum<T extends number>(enums: { [k: string]: T | string }) {
  const values = Object.values(enums).filter((x): x is T => typeof x === 'number');
  return values[Random.integer(0, values.length - 1)];
}

export function curd<T>(instance: () => T) {
  return Router()
    .post('/', (req, res) => res.json({ ...req.body, id: uuid() }))
    .delete('/:id', (req, res) => res.json({ id: req.params.id }))
    .put('/:id', (req, res) => res.json(req.body))
    .get('/:id', (req, res) => res.json({ ...instance(), id: req.params.id }))
    .get('/', (req, res) => res.json(page(instance, req)));
}
