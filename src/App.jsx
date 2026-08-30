import { useState } from "react";

function App() {
  const [page, setPage] = useState("login");
  const [direction, setDirection] = useState("next");
  const [error, setError] = useState("");
  const [buttonPos, setButtonPos] = useState({ x: 0, y: 0 });

  const [mousePreview, setMousePreview] = useState(false);
  const [cursor, setCursor] = useState({ x: 0, y: 0 });

  const switchPage = (nextPage) => {
    if (nextPage === page) return;

    setDirection(nextPage === "register" ? "next" : "back");
    setError("");
    setButtonPos({ x: 0, y: 0 });

    setPage(nextPage);
  };

  const moveButtonAway = (x, y, rect) => {
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const dx = centerX - x;
    const dy = centerY - y;

    const distance = Math.hypot(dx, dy);

    if (distance > 125) {
      setButtonPos({ x: 0, y: 0 });
      return;
    }

    const angle = Math.atan2(dy, dx);

    const strength = Math.min(
      65,
      28 + (125 - distance) * 0.45
    );

    setButtonPos({
      x: Math.cos(angle) * strength,
      y: Math.sin(angle) * strength,
    });
  };

  const handleMouseMove = (event) => {
    if (!mousePreview || page !== "login") return;

    const area = event.currentTarget;
    const rect = area.getBoundingClientRect();

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    setCursor({ x, y });

    moveButtonAway(x, y, rect);
  };

  const handleTouchMove = (event) => {
    if (!mousePreview || page !== "login") return;

    const touch = event.touches[0];
    const area = event.currentTarget;
    const rect = area.getBoundingClientRect();

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setCursor({ x, y });

    moveButtonAway(x, y, rect);
  };

  const handleTouchStart = (event) => {
    if (!mousePreview || page !== "login") return;

    const touch = event.touches[0];
    const area = event.currentTarget;
    const rect = area.getBoundingClientRect();

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    setCursor({ x, y });

    moveButtonAway(x, y, rect);
  };

  const handleLogin = (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

    const email = form.get("email");
    const password = form.get("password");

    if (!email || !password || password.length < 6) {
      setError("The email or password is incorrect.");

      const area = event.currentTarget.querySelector(
        ".button-area"
      );

      if (area) {
        const rect = area.getBoundingClientRect();

        setButtonPos({
          x: 45,
          y: -20,
        });
      }

      return;
    }

    setError("");
    setButtonPos({ x: 0, y: 0 });

    alert("Login ready — Supabase comes next.");
  };

  const handleRegister = (event) => {
    event.preventDefault();

    const form = new FormData(event.currentTarget);

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

              <span className="eyebrow">
                WELCOME BACK
              </span>

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

                <div
                  className="button-area"
                  onMouseMove={handleMouseMove}
                  onTouchMove={handleTouchMove}
                  onTouchStart={handleTouchStart}
                >

                  {mousePreview && (
                    <div
                      className="fake-cursor"
                      style={{
                        left: cursor.x,
                        top: cursor.y,
                      }}
                    >
                      <div className="cursor-dot" />
                    </div>
                  )}

                  <div
                    className="thread"
                    style={{
                      transform: `translateY(-50%) rotate(${Math.atan2(
                        buttonPos.y,
                        buttonPos.x
                      )}rad)`,
                    }}
                  />

                  <button
                    className="primary-button"
                    type="submit"
                    style={{
                      transform: `translate(
                        ${buttonPos.x}px,
                        ${buttonPos.y}px
                      )`,
                    }}
                  >
                    <span>Sign in</span>

                    <span className="button-arrow">
                      ↗
                    </span>
                  </button>

                </div>
              </form>

              <div className="switch-row">
                <span>
                  Don't have an account?
                </span>

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

              <span className="eyebrow">
                GET STARTED
              </span>

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

                <button
                  className="primary-button register-button"
                  type="submit"
                >
                  <span>Create account</span>

                  <span className="button-arrow">
                    ↗
                  </span>
                </button>

              </form>

              <div className="switch-row">
                <span>
                  Already have an account?
                </span>

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

        <button
          className={`test-mode-button ${
            mousePreview ? "active" : ""
          }`}
          type="button"
          onClick={() => {
            setMousePreview(!mousePreview);
            setButtonPos({ x: 0, y: 0 });
            setCursor({ x: 0, y: 0 });
          }}
        >
          {mousePreview
            ? "EXIT MOUSE PREVIEW"
            : "MOUSE PREVIEW"}
        </button>

      </section>
    </main>
  );
}

export default App;
