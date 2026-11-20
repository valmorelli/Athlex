
export function AuthBackground() {
  return (
    <div className="auth-background" aria-hidden="true">
      <div className="auth-glow auth-glow-left" />
      <div className="auth-glow auth-glow-right" />

      <div className="auth-dots auth-dots-top" />
      <div className="auth-dots auth-dots-bottom" />

      <svg
        className="auth-ribbons auth-ribbons-top"
        viewBox="0 0 1200 360"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient
            id="athlexRibbonTop"
            x1="0"
            y1="0"
            x2="1200"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#24F0B7" />
            <stop offset="0.45" stopColor="#08B9D5" />
            <stop offset="1" stopColor="#155078" />
          </linearGradient>
        </defs>

        <path
          d="M-80 310 C200 15 400 10 690 100 C890 160 1030 60 1280 -60"
          stroke="url(#athlexRibbonTop)"
          strokeWidth="30"
          opacity="0.06"
        />
        <path
          d="M-80 305 C200 10 400 5 690 95 C890 155 1030 55 1280 -65"
          stroke="url(#athlexRibbonTop)"
          strokeWidth="2.5"
          opacity="0.95"
        />
        <path
          d="M-80 325 C205 35 400 24 690 114 C890 175 1030 75 1280 -45"
          stroke="url(#athlexRibbonTop)"
          strokeWidth="1.4"
          opacity="0.56"
        />
        <path
          d="M-80 340 C205 50 400 42 690 132 C890 190 1030 90 1280 -30"
          stroke="url(#athlexRibbonTop)"
          strokeWidth="1"
          opacity="0.3"
        />
        <path
          d="M-80 350 C205 65 400 58 690 146 C890 204 1030 104 1280 -15"
          stroke="url(#athlexRibbonTop)"
          strokeWidth="0.8"
          opacity="0.19"
        />
      </svg>

      <svg
        className="auth-ribbons auth-ribbons-bottom"
        viewBox="0 0 1200 360"
        preserveAspectRatio="none"
        fill="none"
      >
        <defs>
          <linearGradient
            id="athlexRibbonBottom"
            x1="0"
            y1="0"
            x2="1200"
            y2="300"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#0A658B" />
            <stop offset="0.55" stopColor="#0CC0BE" />
            <stop offset="1" stopColor="#2AF0B3" />
          </linearGradient>
        </defs>

        <path
          d="M-80 370 C190 230 320 260 555 285 C800 315 990 120 1280 0"
          stroke="url(#athlexRibbonBottom)"
          strokeWidth="40"
          opacity="0.05"
        />
        <path
          d="M-80 360 C190 220 320 250 555 275 C800 305 990 110 1280 -10"
          stroke="url(#athlexRibbonBottom)"
          strokeWidth="2.4"
          opacity="0.8"
        />
        <path
          d="M-80 340 C190 200 320 230 555 255 C800 285 990 90 1280 -30"
          stroke="url(#athlexRibbonBottom)"
          strokeWidth="1.3"
          opacity="0.5"
        />
        <path
          d="M-80 322 C190 182 320 212 555 237 C800 267 990 72 1280 -48"
          stroke="url(#athlexRibbonBottom)"
          strokeWidth="0.9"
          opacity="0.25"
        />
      </svg>
    </div>
  );
}
