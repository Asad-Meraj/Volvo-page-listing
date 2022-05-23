import '../public/css/styles.css';
import React from 'react';

function MyApp(props: any) {
  const { Component, pageProps } = props;
  return (
    <React.StrictMode>
      <Component {...pageProps} />
    </React.StrictMode>
  );
}

export default MyApp;
