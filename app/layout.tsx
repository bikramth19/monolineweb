import type { Metadata } from 'next';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-svg-core/styles.css';
import '@fontsource-variable/roboto';
import '@fontsource-variable/roboto/wght-italic.css';
import './globals.css';

export const metadata:Metadata={title:{default:'Monoline | Accounting & Advisory',template:'%s | Monoline'},description:'Accounting, taxation, compliance and practical business advisory.'};
export default function RootLayout({children}:{children:React.ReactNode}){
  return <html lang="en"><body>{children}</body></html>;
}
