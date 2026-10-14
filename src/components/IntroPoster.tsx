/** Bypass document anchor padding so no part of the film remains above the hero. */
export function scrollToMainHero(reduced = false) {
 const hero=document.getElementById("cashvariance-hero");
 if(!hero)return;
 window.scrollTo({top:Math.ceil(hero.getBoundingClientRect().top+window.scrollY),behavior:reduced?"instant":"smooth"});
 hero.focus({preventScroll:true});
}
export function IntroPoster() {
 return <div className="intro-poster"><img src="/intro/hold.webp" alt="Limestone observatory overlooking an estuary, with two bronze instruments showing unequal markers." fetchPriority="high"/><div className="intro-poster-copy"><span>CONCEPT FILM · SYNTHETIC DATA</span><h2>A clearer view.<br/>Before the next decision.</h2><p>$8,000 unexplained · Held for review</p></div></div>;
}
export function IntroLoading() {
 return <section className="intro-film" aria-label="CashVariance observatory introduction"><div className="intro-stage"><IntroPoster/></div><div className="intro-toolbar"><span>THE TREASURY OBSERVATORY · 12 SECONDS</span><a className="intro-skip" href="#cashvariance-hero" onClick={event=>{event.preventDefault();scrollToMainHero(matchMedia("(prefers-reduced-motion: reduce)").matches)}}>Skip to hero ↓</a></div></section>;
}
