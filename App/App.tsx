// Sh**t! I Smoke
// Copyright (C) 2018-2019  Marcelo S. Coelho, Amaury Martiny

// Sh**t! I Smoke is free software: you can redistribute it and/or modify
// it under the terms of the GNU General Public License as published by
// the Free Software Foundation, either version 3 of the License, or
// (at your option) any later version.

// Sh**t! I Smoke is distributed in the hope that it will be useful,
// but WITHOUT ANY WARRANTY; without even the implied warranty of
// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
// GNU General Public License for more details.

// You should have received a copy of the GNU General Public License
// along with Sh**t! I Smoke.  If not, see <http://www.gnu.org/licenses/>.

import * as Amplitude from 'expo-analytics-amplitude';
import * as Font from 'expo-font';
import Constants from 'expo-constants';
import React, { useEffect, useState } from 'react';
import * as Sentry from 'sentry-expo';

import { Screens } from './Screens';
import { Background as LoadingBackground } from './Screens/Loading/Background';
import {
  ApiContextProvider,
  ErrorContextProvider,
  LocationContextProvider
} from './stores';

// Add Sentry if available
if (Constants.manifest.extra.sentryPublicDsn) {
  Sentry.init({
    dsn: Constants.manifest.extra.sentryPublicDsn,
    debug: true
  });

  if (Constants.manifest.revisionId) {
    Sentry.setRelease(Constants.manifest.revisionId);
  }
}

// Add Amplitude if available
if (Constants.manifest.extra.amplitudeApiKey) {
  Amplitude.initialize(Constants.manifest.extra.amplitudeApiKey);
  Amplitude.setUserProperties({
    sisReleaseChannel: Constants.manifest.releaseChannel || 'development',
    sisVersion: Constants.manifest.version
  });
}

export function App () {
  const [fontLoaded, setFontLoaded] = useState(false);
  useEffect(() => {
    Font.loadAsync({
      'gotham-black': require('../assets/fonts/Gotham-Black.ttf'),
      'gotham-book': require('../assets/fonts/Gotham-Book.ttf')
    })
      .then(() => setFontLoaded(true))
      .catch(console.error);
  }, []);

  return fontLoaded ? (
    <ErrorContextProvider>
      <LocationContextProvider>
        <ApiContextProvider>
          <Screens />
        </ApiContextProvider>
      </LocationContextProvider>
    </ErrorContextProvider>
  ) : (
    <LoadingBackground />
  );
}
