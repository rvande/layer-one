import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { Mesh } from '@/components/Mesh';
import { LayerStack } from '@/components/LayerStack';
import { ContactBand } from '@/components/ContactBand';
import { pageMetadata, pageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('home');

export default function HomePage() {
  return (
    <>
      <JsonLd data={pageJsonLd('home')} />
      <main id="main">
        <section className="hero"><Mesh tone="light" />
          <div className="wrap">
            <div>
              <h1>Networks you never think about. Software you actually want to use.</h1>
              <p className="lead">Layer One is an IT consultancy in Hartland, Wisconsin. We design secure business networks and build custom software for companies from Lake Country and Milwaukee to Chicago and its suburbs.</p>
              <div className="btns">
                <a className="btn" href="#contact">Book a free consultation</a>
                <Link className="btn ghost" href="/work">See what we&apos;ve built</Link>
              </div>
              <p className="where">On-site across southeast Wisconsin and Chicagoland. Remote for software and advisory work.</p>
            </div>
            <LayerStack label={"The seven layers of a network. Layer One works across all seven."} caption={"Every layer of the stack, top to bottom. We start at layer one."} rows={[{"n":7,"name":"Application","svc":"Custom apps, APIs, AI automation"},{"n":6,"name":"Presentation","svc":"Encryption, TLS, certificates"},{"n":5,"name":"Session","svc":"VPN, remote access, MFA"},{"n":4,"name":"Transport","svc":"Firewall policy, ports, QoS"},{"n":3,"name":"Network","svc":"Routing and segmentation"},{"n":2,"name":"Data link","svc":"Switching, VLANs, Wi-Fi"},{"n":1,"name":"Physical","svc":"Cabling, hardware, power"}]} />
          </div>
        </section>

        <section className="facts" aria-label="Background">
          <div className="wrap"><ul>
            <li><b>10+ years</b><span>in enterprise network engineering</span></li>
            <li><b>Shipped to both stores</b><span>Tag, You&apos;re It is live on the App Store and Google Play</span></li>
            <li><b>Region 5 Chair</b><span>Utility Technology Council</span></li>
            <li><b>Vendor-agnostic</b><span>Fortinet, Cisco, Palo Alto, Arista, Microsoft 365</span></li>
          </ul></div>
        </section>

        <section className="sec" aria-labelledby="svc-h">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="svc-h">What we do</h2>
              <p>Five kinds of work, all done by the same engineer who answers your email.</p>
            </div>
            <ul className="svc-list">
              <li><Link href="/services/network-security-waukesha-county"><h3>Network &amp; security</h3><p>Firewalls, switching, Wi-Fi and VPNs designed, installed and documented so your office stays up and stays private.</p><span className="layers">Layers 1&ndash;7</span></Link></li>
              <li><Link href="/services#software"><h3>Custom software &amp; apps</h3><p>Web apps, mobile apps, booking and point-of-sale systems, and integrations with the tools you already pay for.</p><span className="layers">Layer 7</span></Link></li>
              <li><Link href="/services#ai"><h3>AI &amp; automation</h3><p>Agents and workflows that draft the repetitive work so your team only has to review and decide.</p><span className="layers">Layer 7</span></Link></li>
              <li><Link href="/services#infrastructure"><h3>Infrastructure &amp; backups</h3><p>Virtual servers, storage and nightly backups that you can actually restore from when something breaks.</p><span className="layers">Layers 1&ndash;2</span></Link></li>
              <li><Link href="/services#advisory"><h3>Compliance &amp; advisory</h3><p>Plain-language technology plans, vendor selection and security reviews informed by NIST and utility-grade compliance work.</p><span className="layers">All layers</span></Link></li>
            </ul>
          </div>
        </section>

        <section className="sec white" aria-labelledby="work-h">
          <div className="wrap">
            <div className="sec-head">
              <h2 id="work-h">Recent work</h2>
              <p>Products we&apos;ve designed, built and shipped. <Link href="/work">See every project</Link>.</p>
            </div>
            <div className="work">
              <article className="w-lg">
                <div className="media"><Image src="/assets/tag-art.jpg" alt="Tag, You're It sign-in screen over graffiti artwork reading Break the Algorithm" width={892} height={893} style={{ objectPosition: "50% 30%" }} /></div>
                <div className="body"><span className="status live">Live</span><h3>Tag, You&apos;re It</h3><p>A social app for real friends with no algorithmic feed. One Next.js codebase, shipped to the web, iOS and Android.</p></div>
              </article>
              <article className="w-sm">
                <div className="media"><pre className="term" aria-label="Sample Cisco IOS configuration output"><span className="c">! Generated by Henderson&apos;s Cisco Config Generator</span>{"\n"}<span className="k">hostname</span> FRONT-OFFICE-SW1{"\n"}<span className="k">vlan</span> 10{"\n"}{" "}<span className="k">name</span> <span className="s">DATA</span>{"\n"}<span className="k">vlan</span> 20{"\n"}{" "}<span className="k">name</span> <span className="s">VOICE</span>{"\n"}<span className="k">interface range</span> Gi1/0/1 - 24{"\n"}{" "}<span className="k">switchport mode</span> access{"\n"}{" "}<span className="k">switchport access vlan</span> 10{"\n"}{" "}<span className="k">switchport voice vlan</span> 20{"\n"}{" "}<span className="k">spanning-tree portfast</span>{"\n"}<span className="k">ip ssh version</span> 2{"\n"}<span className="k">no ip http server</span></pre></div>
                <div className="body"><span className="status live">Free tool</span><h3>Cisco config generator</h3><p>Fill in a form, get a clean Catalyst or ISR configuration. Runs in your browser; nothing you type leaves it.</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="sec" aria-labelledby="how-h">
          <div className="wrap">
            <div className="sec-head"><h2 id="how-h">How a project runs</h2><p>No retainers to start. You know what you&apos;re getting before any work begins.</p></div>
            <ol className="steps">
              <li><h3>Free consultation</h3><p>A 30-minute call or visit. You describe the problem; we ask about what you already have.</p></li>
              <li><h3>Written plan</h3><p>A short scope with what we&apos;ll do, what it costs and what you&apos;ll have at the end.</p></li>
              <li><h3>Build and install</h3><p>Work is scheduled around your hours, tested before cut-over, and rolled back if anything misbehaves.</p></li>
              <li><h3>Hand-off</h3><p>Diagrams, configs, passwords and a plain-English summary, so you&apos;re never locked in to us.</p></li>
            </ol>
          </div>
        </section>

        <section className="sec white" aria-labelledby="who-h">
          <div className="wrap person">
            <figure className="photo-frame"><Image src="/assets/joseph-daughter.jpg" alt="Joseph J. Henderson and his daughter" width={1052} height={904} /><figcaption>Joseph and his daughter.</figcaption></figure>
            <div>
              <p className="kicker">Family first</p>
              <h2 id="who-h">Who you&apos;ll work with</h2>
              <p className="lead" style={{ marginTop: "1rem" }}>Joseph J. Henderson founded Layer One and still does the engineering himself. He&apos;s a husband and dad first, and he runs the business the way he&apos;d want it run for his own family: straight answers, careful work, and nothing left undocumented.</p>
              <ul className="roles">
                <li>Co-Founder and Principal Engineer, Layer One</li>
                <li>Region 5 Chair, Utility Technology Council</li>
                <li>M.B.A., DePaul University</li>
              </ul>
              <Link className="btn ghost" href="/about/joseph-henderson">Meet Joseph and his family</Link>
            </div>
          </div>
        </section>

        <section className="sec" id="area" aria-labelledby="area-h">
          <div className="wrap split">
            <div><h2 id="area-h">From Lake Country to Chicago</h2><p className="lead" style={{ marginTop: "1rem" }}>Based in Hartland. On-site across Waukesha County, the Milwaukee metro, Chicago and the surrounding suburbs.</p></div>
            <div className="regions">
              <div><h3>Wisconsin</h3><ul className="towns">
                <li>Hartland</li><li>Pewaukee</li><li>Delafield</li><li>Oconomowoc</li><li>Sussex</li><li>Merton</li>
                <li>Waukesha</li><li>Brookfield</li><li>Menomonee Falls</li><li>New Berlin</li><li>Wauwatosa</li><li>Milwaukee</li></ul></div>
              <div><h3>Illinois</h3><ul className="towns">
                <li>Chicago</li><li>Evanston</li><li>Skokie</li><li>Arlington Heights</li><li>Schaumburg</li><li>Oak Brook</li>
                <li>Naperville</li><li>Lake Forest</li></ul></div>
            </div>
          </div>
        </section>

        <section className="sec white" aria-labelledby="faq-h">
          <div className="wrap split">
            <h2 id="faq-h">Questions people ask first</h2>
            <div className="faq"><details open><summary>Do you work with small businesses?</summary><p>Yes. Most clients are small and mid-sized businesses without a full-time network engineer. You get the same design standards used in enterprise networks, scaled to your office and your budget.</p></details><details><summary>Do you work outside Hartland?</summary><p>Layer One is based in Hartland and works on-site across Lake Country, Waukesha County, the Milwaukee area, Chicago and the Chicago suburbs. Software, automation and advisory work can be done remotely for clients anywhere.</p></details><details><summary>Which equipment do you work with?</summary><p>We&apos;re vendor-agnostic on purpose. Day to day that means Fortinet, Cisco, Palo Alto Networks, Arista and Microsoft 365, plus Proxmox, Docker and Synology for servers and storage. If you already own gear, we start with what you have.</p></details><details><summary>Can you build an app or a website for my business?</summary><p>Yes. We build web apps, mobile apps for the App Store and Google Play, booking and point-of-sale systems, and the integrations that connect them to the tools you already use.</p></details></div>
          </div>
        </section>
      </main>
      <ContactBand
        heading={"Tell us what's broken, or what you want built."}
        blurb={"A sentence or two is plenty. We'll reply with questions or a time to talk."}
      />
    </>
  );
}
