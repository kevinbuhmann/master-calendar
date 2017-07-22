const node = typeof window === 'undefined';

const firebaseConfig = {
  apiKey: 'AIzaSyCeqGlAHuFRBXvarjoAzr9ifIBqPibbM5c',
  authDomain: 'master-calendar-54d80.firebaseapp.com',
  databaseURL: 'https://master-calendar-54d80.firebaseio.com',
  projectId: 'master-calendar-54d80',
  storageBucket: 'master-calendar-54d80.appspot.com',
  messagingSenderId: '75912964717'
};

export const commonEnvironment = {
  node,
  browser: node === false,
  firebaseConfig
};
