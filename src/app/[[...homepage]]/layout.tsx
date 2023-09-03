import { Inter } from "next/font/google";
import ReduxProvider from "../../redux/provides";
import HomeContainer from "../../containers/homepage/index";



import "../../../styles/reset.css";
import "../../../styles/variables.css";
import ".././../../styles/global.css";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";


const interFontFamily = Inter({ subsets: ['latin'] });

export default function RootLayout({ children }:any) {
  
  return (
    <html lang="en" className={interFontFamily.className}>
        <body className="bgDark">
          <ReduxProvider>
            <HomeContainer children={children}/>
          </ReduxProvider>      
        </body>
    </html>
  )
}