// Copyright (c) 2018, Amaury Martiny and the Shoot! I Smoke contributors
// SPDX-License-Identifier: GPL-3.0

import { types } from 'mobx-state-tree';

const location = name =>
  types.maybe(
    types.model(name, {
      latitude: types.number,
      longitude: types.number,
      name: types.maybe(types.string)
    })
  );

const current = location('CurrentStore');
const gps = location('ApiStore');

export const LocationStore = types
  .model('LocationStore', {
    current,
    gps
  })
  .actions(self => ({
    setCurrent(current) {
      self.current = current;
    },
    setGps(gps) {
      self.gps = gps;
    }
  }));
