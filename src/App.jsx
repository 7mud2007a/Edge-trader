import { useState } from "react";

function App() {
  const [page, setPage] = useState("login");
  const [direction, setDirection] = useState("next");
  const [error, setError] = useState("");
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });

  const switchPage = (nextPage) => {
    if (nextPage === page) return;

    setDirection(nextPage === "register" ? "next" : "back");
    setError("");
    setButtonPos({ x: 0, y: 0 });

    setPage(nextPage);
  };

  const escapeButton = () => {
    const angle = Math.random() * Math.PI * 2;
    const radius = 22 + Math.random() * 28;

    setButtonPos({
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius,
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const email = form.get("email");
    const password = form.get("password");

    if (!email || !password || password.length < 6) {
      setError("The email or password is incorrect.");
      escapeButton();
      return;
    }

    setError("");
    setButtonPos({ x: 0, y: 0 });

    // Supabase authentication will be connected here.
    alert("Login ready — Supabase comes next.");
  };

  const handleRegister = (e) => {
    e.preventDefault();

    const form = new FormData(e.currentTarget);
    const name = form.get("name");
    const email = form.get("email");
    const password = form.get("password");

    if (!name || !email || !password || password.length < 6) {
      setError("Please complete all fields correctly.");
      return;
    }

    setError("");
    alert("Account ready — Supabase comes next.");
  };

  return (
    <main className="app">
      <div className="noise" />

      <div className="light light-one" />
      <div className="light light-two" />
      <div className="light light-three" />

      <section className="auth-shell">
        <header className="brand">
          <div className="brand-icon">
            <span>M</span>
          </div>

          <div>
            <strong>MARKET</strong>
            <span>GLASS</span>
          </div>
        </header>

        <div
          className={`auth-window transition-${direction}`}
          key={page}
        >
          <div className="glass-highlight" />

          {page === "login" ? (
            <div className="auth-panel">
              <div className="top-label">
                <span className="live-dot" />
                MARKETS ONLINE
              </div>

              <span className="eyebrow">WELCOME BACK</span>

              <h1>
                Trade with
                <br />
                clarity.
              </h1>

              <p className="subtitle">
                Your market intelligence, beautifully simplified.
              </p>

              <form onSubmit={handleLogin}>
                <div className="field">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                  />
                </div>

                <div className="field">
                  <input
                    name="password"
                    type="password"
                    placeholder="Password"
                    autoComplete="current-password"
                  />
                </div>

                {error && (
                  <div className="error-message">
                    <span>!</span>
                    {error}
                  </div>
                )}

                <div className="button-area">
                  <div
                    className="thread"
                    style={{
                      transform: `rotate(${Math.atan2(
                        buttonPos.y,
                        buttonPos.x
                      )}rad)`,
                    }}
                  />

                  <button
                    className="primary-button"
                    type="submit"
                    style={{
                      transform: `translate(${buttonPos.x}px, ${buttonPos.y}px)`,
                    }}
                  >
                    <span>Sign in</span>
                    <span className="button-arrow">↗</span>
                  </button>
                </div>
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
              <div className="top-label">
                <span className="live-dot" />
                PRIVATE MARKET TERMINAL
              </div>

              <span className="eyebrow">GET STARTED</span>

              <h1>
                Build your
                <br />
                edge.
              </h1>

              <p className="subtitle">
                Create your personal market intelligence terminal.
              </p>

              <form onSubmit={handleRegister}>
                <div className="field">
                  <input
                    name="name"
                    type="text"
                    placeholder="Full name"
                    autoComplete="name"
                  />
                </div>

                <div className="field">
                  <input
                    name="email"
                    type="email"
                    placeholder="Email address"
                    autoComplete="email"
                  />
                </div>

                <div className="field">
                  <input
                    name="password"
                    type="password"
                    placeholder="Create password"
                    autoComplete="new-password"
                  />
                </div>

                {error && (
                  <div className="error-message">
                    <span>!</span>
                    {error}
                  </div>
                )}

                <button className="primary-button register-button" type="submit">
                  <span>Create account</span>
                  <span className="button-arrow">↗</span>
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

        <footer className="secure-footer">
          <span>ENCRYPTED</span>
          <i />
          <span>PRIVATE</span>
          <i />
          <span>MARKET INTELLIGENCE</span>
        </footer>
      </section>
    </main>
  );
}

export default App;
