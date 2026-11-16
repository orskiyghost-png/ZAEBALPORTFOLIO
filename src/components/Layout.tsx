import type { ReactNode } from 'react';
import { Cursor } from './Cursor';
import { Footer } from './Footer';
import { Grain } from './Grain';
import { Nav } from './Nav';
import { PageTransition } from './PageTransition';
import { ScrollProgress } from './ScrollProgress';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <>
      <a className="skip-link" href="#main-content">Перейти к содержимому</a>
      <Nav />
      <main className="main" id="main-content" tabIndex={-1}>
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <Grain />
      <ScrollProgress />
      <Cursor />
    </>
  );
}
