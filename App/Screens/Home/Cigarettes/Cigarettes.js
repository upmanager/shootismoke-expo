// Copyright (c) 2018-2019, Amaury Martiny
// SPDX-License-Identifier: GPL-3.0

import React, { Component } from 'react';
import { inject, observer } from 'mobx-react';
import { StyleSheet, View } from 'react-native';

import { Cigarette } from './Cigarette';

@inject('stores')
@observer
export class Cigarettes extends Component {
  getSize = cigarettes => {
    if (cigarettes <= 1) return 'big';
    if (cigarettes <= 5) return 'big';
    if (cigarettes <= 14) return 'medium';
    return 'small';
  };

  render () {
    const { stores, style } = this.props;
    const cigarettes = Math.round(Math.min(stores.cigarettes, 63) * 10) / 10; // We don't show more than 63
    // const cigarettes = 0.9; // Can change values here for testing

    const count = Math.floor(cigarettes);
    const decimal = cigarettes - count;

    const diagonal = cigarettes <= 1;
    const vertical = cigarettes > 5;

    return (
      <View style={style}>
        <View style={styles.container}>
          {cigarettes > 1 && count >= 1
            ? Array.from(Array(count)).map((_, i) => (
              <View key={i}>
                <Cigarette
                  size={this.getSize(cigarettes)}
                  vertical={vertical}
                />
              </View>
            ))
            : null}
          {cigarettes === 1 || decimal > 0 ? (
            <Cigarette
              diagonal={diagonal}
              length={decimal || 1}
              size={this.getSize(cigarettes)}
              style={cigarettes <= 1 ? styles.single : undefined}
              vertical={vertical}
            />
          ) : null}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-end',
    flexDirection: 'row',
    flexWrap: 'wrap'
  }
});
