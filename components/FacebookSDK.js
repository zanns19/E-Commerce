"use client";

import Script from "next/script";

export default function FacebookSDK() {
  return (
    <>
      <div id="fb-root"></div>

      <Script
        id="facebook-sdk"
        strategy="lazyOnload"
        src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v22.0"
      />
    </>
  );
}