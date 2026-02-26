import type { Metadata } from 'next';
import { DM_Serif_Display } from 'next/font/google';
import './globals.css';

const dmSerifDisplay = DM_Serif_Display({
  weight: ['400'],
  subsets: ['latin'],
  variable: '--font-dm-serif',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Otomodelacion Definitiva con Dr. Hector | Recupera tu Confianza',
  description: 'Termina con la inseguridad de las orejas prominentes. El Dr. Hector, especialista en otomodelacion, te ofrece un resultado natural y definitivo. Agenda tu evaluacion.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es" className={dmSerifDisplay.variable}>
      <body>{children}</body>
    </html>
  );
}
