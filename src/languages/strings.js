import LocalizedStrings from 'react-native-localization';
import AsyncStorage from '@react-native-community/async-storage';

import en from "../languages/en.json";
import ar from "../languages/ar.json";

let strings = new LocalizedStrings({en:en,ar:ar});

export default strings;