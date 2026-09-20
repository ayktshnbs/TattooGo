import { Component, type ErrorInfo, type ReactNode } from 'react';

/**
 * Root error boundary. One unexpected render exception used to blank the whole
 * SPA (React unmounts the tree); now it renders a small recoverable notice
 * instead and keeps the header/router alive for the next navigation.
 *
 * Bilingual by DOM language (`<html lang>` is kept in sync by LangProvider) —
 * class components can't use the LangContext hook, and the boundary must not
 * depend on the tree it protects.
 */
interface State { error: Error | null }

export class ErrorBoundary extends Component<{ children: ReactNode }, State> {
  state: State = { error: null };

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Client-side only; nothing sensitive is in a render error message.
    console.error('render error', error, info.componentStack);
  }

  render() {
    if (!this.state.error) return this.props.children;
    const tr = typeof document !== 'undefined' && document.documentElement.lang === 'tr';
    return (
      <div className="container" style={{ paddingTop: 140, paddingBottom: 80, maxWidth: 560 }}>
        <span className="mono text-muted">{tr ? 'Bir şeyler ters gitti' : 'Something went wrong'}</span>
        <h1 className="display display-md" style={{ margin: '12px 0 16px' }}>
          {tr ? 'Bu sayfa yüklenemedi.' : 'This page could not be displayed.'}
        </h1>
        <p className="text-muted" style={{ margin: '0 0 24px' }}>
          {tr
            ? 'Beklenmeyen bir hata oluştu. Sayfayı yenilemeyi deneyin; sorun sürerse ana sayfaya dönebilirsiniz.'
            : 'An unexpected error occurred. Try reloading the page; if it persists, head back to the homepage.'}
        </p>
        <div className="row gap-3 wrap">
          <button className="btn btn-sm btn-accent" onClick={() => window.location.reload()}>
            {tr ? 'Yenile' : 'Reload'}
          </button>
          <a className="btn btn-sm btn-ghost" href="/">{tr ? 'Ana sayfa' : 'Home'}</a>
        </div>
      </div>
    );
  }
}
