import type { Metadata } from 'next';
import Image from 'next/image';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { ContactBand } from '@/components/ContactBand';
import { pageMetadata, pageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('about');

export default function AboutPage() {
  return (
    <>
      <JsonLd data={pageJsonLd('about')} />
      <Breadcrumbs items={[{"href":"/","label":"Home"},{"label":"About"}]} />
      <main id="main">
        <section className="hero">
          <div className="wrap">
            <div>
              <p className="kicker">Meet the co-founder</p>
              <h1>Joseph J. Henderson</h1>
              <p className="lead" style={{ marginTop: "1.1rem" }}>Husband, dad chef and Bears fan who also happens to design networks and write software. Co-Founder and Principal Engineer of Layer One, and its original founder.</p>
              <div className="btns" style={{ marginTop: "2rem" }}><a className="btn" href="#contact">Work with Joseph</a><a className="btn ghost" href="#family">Family first</a></div>
            </div>
            <figure className="photo-frame">
              <Image src="/assets/joe-family.jpg" alt="Joseph with his wife Deonda and their kids Caiden and Payton at a WWE event" width={960} height={1280} />
              <figcaption>The Henderson family, WWE 2026. Joseph is Team Alexa Bliss. Everyone else is Team Penta.</figcaption>
            </figure>
          </div>
        </section>

        <section className="sec white" id="family" aria-labelledby="family-h">
          <div className="wrap family">
            <figure className="photo-frame big">
              <Image src="/assets/joseph-daughter.jpg" alt="Joseph and his daughter smiling together at an outdoor festival" width={1052} height={904} />
              <figcaption>Joseph and his daughter. The best part of any day off.</figcaption>
            </figure>
            <div>
              <h2 id="family-h">Family first</h2>
              <p className="lead" style={{ marginTop: "1rem" }}>Joseph and his wife, Deonda, live in the Hartland area, where their world revolves around their two kids, Caiden and Payton. That isn&apos;t a side note to the business. It&apos;s the reason for it.</p>
              <p>Family first shapes how Layer One works and what it builds. Free Family Display keeps a household&apos;s week on one screen. Safeguard helps parents look out for their kids online without spying on them. And every client network gets the care Joseph would want for his own family&apos;s business.</p>
              <blockquote className="note-card">
                <p>&quot;I build everything the way I&apos;d want it built for my own family: honest, documented, and done right the first time.&quot;</p>
                <footer>Joseph</footer>
              </blockquote>
            </div>
          </div>
        </section>

        <section className="sec" aria-labelledby="life-h">
          <div className="wrap">
            <div className="sec-head"><h2 id="life-h">Off the clock</h2><p>When he steps away from the keyboard, you&apos;ll usually find him here.</p></div>
            <ul className="tiles">
              <li><span className="icon"><svg viewBox="0 0 24 24"><path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.07-2.14-.22-4.05 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.15.43-2.29 1-3a2.5 2.5 0 0 0 2.5 2.5z" /></svg></span><h3>Dad chef</h3><p>Happiest at the grill. House specialties: BBQ ribs, steaks, butter chicken, chicken noodle soup and birria tacos.</p></li>
              <li><span className="icon"><svg viewBox="0 0 24 24"><path d="M12 2l2.6 6.5L21 9l-5 4.5L17.5 21 12 17.3 6.5 21 8 13.5 3 9l6.4-.5z" /></svg></span><h3>Bear down</h3><p>Wisconsin address, Chicago Bears loyalty. Every Sunday.</p></li>
              <li><span className="icon"><svg viewBox="0 0 24 24"><path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9z" /><path d="m13 11-3 4h4l-3 4" /></svg></span><h3>STEM advocate</h3><p>Pushing for hands-on programs that get kids excited about science, like a middle school storm-chasing club.</p></li>
              <li><span className="icon"><svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="6" /><path d="M15.5 13.5 17 22l-5-3-5 3 1.5-8.5" /></svg></span><h3>Mentor</h3><p>Invests in the people around him as much as the systems they run.</p></li>
              <li><span className="icon"><svg viewBox="0 0 24 24"><rect x="9" y="2" width={6} height={12} rx="3" /><path d="M5 10v1a7 7 0 0 0 14 0v-1M12 18v4M8 22h8" /></svg></span><h3>Podcast</h3><p>The Mental Shift: interviews with local entrepreneurs about business growth and personal development.</p></li>
              <li><span className="icon"><svg viewBox="0 0 24 24"><path d="M22 10 12 5 2 10l10 5 10-5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" /></svg></span><h3>Education</h3><p>M.B.A., DePaul University &middot; B.S., Governors State University</p></li>
            </ul>
          </div>
        </section>

        <section className="sec white" aria-labelledby="book-h">
          <div className="wrap person book-row">
            <Image src="/assets/incognito-cover.jpg" alt="Cover of Incognito by J.J. Harts" width={598} height={900} style={{ aspectRatio: "2/3", borderRadius: "6px", boxShadow: "0 20px 40px rgba(21,24,29,.25)" }} />
            <div>
              <p className="kicker">The novel</p>
              <h2 id="book-h"><i>Incognito</i></h2>
              <p className="muted" style={{ margin: ".6rem 0 1.2rem" }}>A psychological thriller, written as J.J. Harts. Coming 2027.</p>
              <p className="lead" style={{ color: "var(--ink)" }}>He kills in plain sight. The FBI agent hunting him is his wife.</p>
              <p className="muted">He&apos;s an IT engineer who knows how to disappear inside the systems he runs. She&apos;s the agent trained to find people who can&apos;t be found. Told from both sides, drawn from the real world of enterprise networking.</p>
            </div>
          </div>
        </section>

        <section className="sec" aria-labelledby="work-h">
          <div className="wrap split">
            <h2 id="work-h">At work</h2>
            <div>
              <p className="lead">Joseph works on both sides of IT: mission-critical enterprise networks and modern, AI-assisted software.</p>
              <ul className="roles-list" style={{ margin: "1.5rem 0 1.75rem" }}>
                <li>Co-Founder and Principal Engineer, Layer One IT Consultants</li>
                <li>Team Leader, Enterprise Network Engineering and Telecom, Midwest Utility</li>
                <li>Region 5 Chair, Utility Technology Council (UTC), organizing regional summits and workforce development</li>
              </ul>
              <p className="muted"><b style={{ color: "var(--ink)" }}>Expertise:</b> Cisco, Palo Alto, Fortinet, Arista and Nokia networks; React, Next.js, TypeScript and PostgreSQL; AI agents and automation; Proxmox, Docker and Synology; NERC CIP and NIST-aligned security programs.</p>
            </div>
          </div>
        </section>
      </main>
      <ContactBand
        heading={"Work with Joseph"}
        blurb={"Networks, software, automation or a second opinion on a quote. Start with a message, and you'll hear back from him directly."}
      />
    </>
  );
}
