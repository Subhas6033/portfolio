export const KEYFRAMES = `
  @keyframes ticker        { from{transform:translateX(0)}      to{transform:translateX(-50%)} }
  @keyframes fadeUp        { from{opacity:0;transform:translateY(40px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeLeft      { from{opacity:0;transform:translateX(-40px)} to{opacity:1;transform:translateX(0)} }
  @keyframes fadeRight     { from{opacity:0;transform:translateX(40px)}  to{opacity:1;transform:translateX(0)} }
  @keyframes scaleIn       { from{opacity:0;transform:scale(0.88)}       to{opacity:1;transform:scale(1)} }
  @keyframes shimmer       { from{background-position:-200% 0}           to{background-position:200% 0} }
  @keyframes blink         { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes spin          { from{transform:rotate(0deg)} to{transform:rotate(360deg)} }
  @keyframes floatY        { 0%,100%{transform:translateY(0px)} 50%{transform:translateY(-12px)} }
  @keyframes pulseGlow     { 0%,100%{box-shadow:0 0 0 0 rgba(163,230,53,0.4)} 50%{box-shadow:0 0 0 16px rgba(163,230,53,0)} }
  @keyframes gradPan       { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
  @keyframes borderTrace   { 0%{stroke-dashoffset:1000} 100%{stroke-dashoffset:0} }
  @keyframes countUp       { from{opacity:0;transform:translateY(20px)} to{opacity:1;transform:translateY(0)} }
  @keyframes cursorPulse   { 0%,100%{transform:scale(1);opacity:1} 50%{transform:scale(1.3);opacity:0.7} }
  @keyframes ripple        { 0%{transform:scale(0);opacity:0.6} 100%{transform:scale(4);opacity:0} }
  @keyframes slideReveal   { from{clip-path:inset(0 100% 0 0)} to{clip-path:inset(0 0% 0 0)} }
  @keyframes wobble        { 0%,100%{transform:rotate(-1deg)} 50%{transform:rotate(1deg)} }

  .anim-fadeUp   { animation: fadeUp   0.7s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-fadeLeft { animation: fadeLeft 0.7s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-fadeRight{ animation: fadeRight 0.7s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-scaleIn  { animation: scaleIn  0.6s cubic-bezier(0.16,1,0.3,1) both; }
  .anim-floatY   { animation: floatY   5s ease-in-out infinite; }
  .anim-spin     { animation: spin    20s linear infinite; }
  .anim-wobble   { animation: wobble   3s ease-in-out infinite; }
  .anim-pulseGlow{ animation: pulseGlow 2.5s ease-in-out infinite; }

  .d-0  { animation-delay: 0s; }
  .d-1  { animation-delay: 0.1s; }
  .d-2  { animation-delay: 0.2s; }
  .d-3  { animation-delay: 0.3s; }
  .d-4  { animation-delay: 0.4s; }
  .d-5  { animation-delay: 0.5s; }
  .d-6  { animation-delay: 0.6s; }
  .d-7  { animation-delay: 0.7s; }
  .d-8  { animation-delay: 0.8s; }

  .shimmer-text {
    background: linear-gradient(90deg, #a3e635 0%, #fff 40%, #a3e635 80%);
    background-size: 200% auto;
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    animation: shimmer 3s linear infinite;
  }

  .hover-lift { transition: transform 0.35s cubic-bezier(0.16,1,0.3,1), box-shadow 0.35s; }
  .hover-lift:hover { transform: translateY(-6px); box-shadow: 0 24px 48px rgba(0,0,0,0.4); }

  .btn-ripple { position:relative; overflow:hidden; }
  .btn-ripple::after {
    content:''; position:absolute; border-radius:50%;
    width:100%; padding-top:100%; top:50%; left:50%;
    transform:translate(-50%,-50%) scale(0);
    background: rgba(255,255,255,0.2);
    transition: transform 0.5s, opacity 0.5s;
    opacity:0;
  }
  .btn-ripple:active::after { transform:translate(-50%,-50%) scale(2); opacity:1; transition:0s; }

  .card-shine {
    position:relative; overflow:hidden;
  }
  .card-shine::before {
    content:''; position:absolute; inset:0;
    background: linear-gradient(105deg, transparent 40%, rgba(163,230,53,0.06) 50%, transparent 60%);
    transform: translateX(-100%);
    transition: transform 0.6s;
    z-index:1;
  }
  .card-shine:hover::before { transform: translateX(100%); }

  .underline-anim { position:relative; display:inline-block; }
  .underline-anim::after {
    content:''; position:absolute; left:0; bottom:-2px;
    width:0; height:2px; background:#a3e635;
    transition: width 0.35s cubic-bezier(0.16,1,0.3,1);
  }
  .underline-anim:hover::after { width:100%; }
`
