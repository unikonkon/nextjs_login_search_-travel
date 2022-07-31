import "../styles/globals.css";
import { SessionProvider } from "next-auth/react";
//ใน function รับค่าเป็น Component, pageProps
function MyApp({ Component, pageProps: { session, ...pageProps } }) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}

export default MyApp;
