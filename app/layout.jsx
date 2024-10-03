import "./globals.css";
import { PathProvider } from '@/components/PathContext';

export const metadata = {
  title: "E-Mart Ndaru Farm",
  description: "Created by BhinekaDeveloper",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PathProvider>
          {children}
        </PathProvider>
      </body>
    </html>
  );
}
