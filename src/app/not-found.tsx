import { Button, Eyebrow, HeroArt } from "@/components/Primitives";
export default function NotFound() {
  return (
    <section className="not-found">
      <div style={{ display: "flex", justifyContent: "center" }}>
        <Eyebrow>404 / An open path</Eyebrow>
      </div>
      <h1>
        This path is
        <br />
        still unresolved.
      </h1>
      <div style={{ maxWidth: 500, margin: "25px auto" }}>
        <HeroArt name="404" />
      </div>
      <p>Return to the overview or inspect a different kind of exception.</p>
      <Button href="/">Return home</Button>
      <Button href="/demo" secondary>
        Explore the demo
      </Button>
    </section>
  );
}
