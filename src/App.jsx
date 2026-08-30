import { useState } from "react";

function App() {
  const [page, setPage] = useState("login");

  const switchPage = (nextPage) => {
    if (nextPage === page) return;
    setPage(nextPage);
  };

  return (
    <main className="app">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />

      <section className="auth-shell">
        <div className="brand">
          <div className="brand-mark">M</div>
          <span>MARKET GLASS</span>
        </div>

        <div className={`auth-window ${page}`}>
          {page === "login" ? (
            <div className="auth-panel">
              <span className="eyebrow">WELCOME BACK</span>

              <h1>Welcome<br />back.</h1>

              <p className="subtitle">
                Analyze the market with clarity.
              </p>

              <form>
                <div className="field">
                  <input
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                  />
                </div>

                <div className="field">
                  <input
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                </div>

                <button className="primary-button" type="submit">
                  <span>Sign in</span>
                  <span className="arrow">↗</span>
                </button>
              </form>

              <div className="switch-row">
                <span>Don't have an account?</span>

                <button
                  type="button"
                  className="text-button"
                  onClick={() => switchPage("register")}
                >
                  Create account
                </button>
              </div>
            </div>
          ) : (
            <div className="auth-panel">
              <span className="eyebrow">GET STARTED</span>

              <h1>Create<br />your account.</h1>

              <p className="subtitle">
                Your market dashboard starts here.
              </p>

              <form>
                <div className="field">
                  <input
                    type="text"
                    placeholder="Full name"
                    autoComplete="name"
                  />
                </div>

                <div className="field">
                  <input
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                  />
                </div>

                <div className="field">
                  <input
                    type="password"
                    placeholder="Create password"
                    autoComplete="new-password"
                  />
                </div>

                <button className="primary-button" type="submit">
                  <span>Create account</span>
                  <span className="arrow">↗</span>
                </button>
              </form>

              <div className="switch-row">
                <span>Already have an account?</span>

                <button
                  type="button"
                  className="text-button"
                  onClick={() => switchPage("login")}
                >
                  Sign in
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="market-status">
          <span className="status-dot" />
          <span>MARKETS ONLINE</span>
        </div>
      </section>
    </main>
  );
}

export default App;
