import { Inter } from "next/font/google";

import ReduxProvider from "../../redux/provides";
import UserContainer from "../../containers/userpage";


import "../../../styles/reset.css";
import "../../../styles/variables.css";
import "../../../styles/global.css";
import "alertifyjs/build/css/alertify.min.css";

import "bootstrap/dist/css/bootstrap.css";

const interFontFamily = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }:any) {
  return (
    <html lang="en" className={interFontFamily.className}>
        <body>
        <ReduxProvider>
            <UserContainer  children={children}/>
            </ReduxProvider>
        </body>
    </html>
  )
}