export function IntroPoster() {
 return <div className="intro-poster"><img src="/intro/hold.webp" alt="Limestone observatory overlooking an estuary, with two bronze instruments showing unequal markers." fetchPriority="high"/><div className="intro-poster-copy"><span>CONCEPT FILM · SYNTHETIC DATA</span><h2>A clearer view.<br/>Before the next decision.</h2><p>$8,000 unexplained · Held for review</p></div></div>;
}
export function IntroLoading() {
 return <section className="intro-film" aria-label="CashVariance observatory introduction"><div className="intro-stage"><IntroPoster/></div><div className="intro-toolbar"><span>THE TREASURY OBSERVATORY · 18 SECONDS</span><a className="intro-skip" href="#cashvariance-hero">Skip to hero ↓</a></div></section>;
}
