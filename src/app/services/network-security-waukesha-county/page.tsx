import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Mesh } from '@/components/Mesh';
import { LayerStack } from '@/components/LayerStack';
import { ContactBand } from '@/components/ContactBand';
import { pageMetadata, pageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('networkSecurity');

export default function NetworkSecurityPage() {
  return (
    <>
      <JsonLd data={pageJsonLd('networkSecurity')} />
      <Breadcrumbs items={[{"href":"/","label":"Home"},{"href":"/services","label":"Services"},{"label":"Network & security"}]} />
      <main id="main">
        <section className="hero"><Mesh tone="light" />
          <div className="wrap">
            <div>
              <h1>Network &amp; firewall services in Waukesha County</h1>
              <p className="lead">Firewalls, switches, Wi-Fi and VPNs for offices in Hartland, Lake Country and the Milwaukee area. Designed by an enterprise network engineer, sized for a small business.</p>
              <div className="btns"><a className="btn" href="#contact">Book a free network review</a><a className="btn ghost" href="#included">What&apos;s included</a></div>
            </div>
            <LayerStack label={"Network and security work covers all seven layers."} caption={"Network and security work spans all seven layers."} rows={[{"n":7,"name":"Application","svc":"App control, web filtering"},{"n":6,"name":"Presentation","svc":"TLS inspection, certificates"},{"n":5,"name":"Session","svc":"VPN and remote access"},{"n":4,"name":"Transport","svc":"Firewall policy, QoS"},{"n":3,"name":"Network","svc":"Routing and segmentation"},{"n":2,"name":"Data link","svc":"Switching, VLANs, Wi-Fi"},{"n":1,"name":"Physical","svc":"Cabling, racks, power"}]} />
          </div>
        </section>

        <section className="sec white" aria-labelledby="prob-h">
          <div className="wrap split">
            <div><h2 id="prob-h">Problems we fix</h2><p className="lead" style={{ marginTop: "1rem" }}>If any of these sound familiar, the network is usually the cause.</p></div>
            <ul className="ticks two-col">
              <li>Video calls freeze when the office is busy</li>
              <li>Wi-Fi is strong in one room and gone in the next</li>
              <li>Guests, cameras and staff share one network</li>
              <li>Nobody knows the firewall&apos;s admin password</li>
              <li>The firewall is out of support or out of date</li>
              <li>Remote staff can&apos;t reach files at the office</li>
              <li>A second location needs to connect to the first</li>
              <li>An insurer or client is asking about your security</li>
            </ul>
          </div>
        </section>

        <section className="sec" id="included" aria-labelledby="inc-h">
          <div className="wrap">
            <div className="sec-head"><h2 id="inc-h">What&apos;s included</h2><p>Every network project follows the same four steps.</p></div>
            <ol className="steps">
              <li><h3>Assess</h3><p>An on-site walk-through, an inventory of your equipment, and a diagram of how things are connected today.</p></li>
              <li><h3>Design</h3><p>Segments for staff, guests, phones and devices, firewall rules between them, and a Wi-Fi plan for your floor layout.</p></li>
              <li><h3>Install</h3><p>New equipment is configured ahead of time and cut over after hours, with a tested way back if anything misbehaves.</p></li>
              <li><h3>Document</h3><p>Final diagrams, commented configuration backups and admin credentials, handed to you.</p></li>
            </ol>
          </div>
        </section>

        <section className="sec white" aria-labelledby="dlv-h">
          <div className="wrap split">
            <div>
              <h2 id="dlv-h">What you keep</h2>
              <p className="lead" style={{ marginTop: "1rem" }}>Configurations come commented, so the next engineer, or you, can read what each rule is for.</p>
              <ul className="ticks" style={{ marginTop: "1.5rem" }}>
                <li>Network diagram, current and planned</li>
                <li>Commented configuration backups for every device</li>
                <li>Admin credentials, handed over securely</li>
                <li>A one-page summary in plain English</li>
              </ul>
            </div>
            <pre className="term" style={{ borderRadius: "12px" }} aria-label="Example of a commented FortiGate firewall policy"><span className="c"># Guest Wi-Fi can reach the internet and nothing else.</span>{"\n"}<span className="k">config firewall policy</span>{"\n"}{"    "}<span className="k">edit</span> 12{"\n"}{"        "}<span className="k">set name</span> <span className="s">&quot;Guest-WiFi-to-Internet&quot;</span>{"\n"}{"        "}<span className="k">set srcintf</span> <span className="s">&quot;guest&quot;</span>{"\n"}{"        "}<span className="k">set dstintf</span> <span className="s">&quot;wan1&quot;</span>{"\n"}{"        "}<span className="k">set srcaddr</span> <span className="s">&quot;all&quot;</span>{"\n"}{"        "}<span className="k">set dstaddr</span> <span className="s">&quot;all&quot;</span>{"\n"}{"        "}<span className="k">set action</span> accept{"\n"}{"        "}<span className="k">set schedule</span> <span className="s">&quot;always&quot;</span>{"\n"}{"        "}<span className="k">set service</span> <span className="s">&quot;HTTP&quot; &quot;HTTPS&quot; &quot;DNS&quot;</span>{"\n"}{"        "}<span className="k">set utm-status</span> enable{"\n"}{"        "}<span className="k">set nat</span> enable{"\n"}{"    "}<span className="k">next</span>{"\n"}<span className="k">end</span></pre>
          </div>
        </section>

        <section className="sec" aria-labelledby="gear-h">
          <div className="wrap split">
            <div><h2 id="gear-h">Equipment we work with</h2><p className="lead" style={{ marginTop: "1rem" }}>Vendor-agnostic on purpose. The right answer is rarely the one on the brochure.</p></div>
            <div className="two-col">
              <div><h3 style={{ marginBottom: ".6rem" }}>Firewalls</h3><p className="muted">Fortinet FortiGate, Palo Alto Networks, Cisco</p></div>
              <div><h3 style={{ marginBottom: ".6rem" }}>Switching</h3><p className="muted">Cisco Catalyst and Nexus, Arista, FortiSwitch</p></div>
              <div><h3 style={{ marginBottom: ".6rem" }}>Wireless</h3><p className="muted">FortiAP and other enterprise access points</p></div>
              <div><h3 style={{ marginBottom: ".6rem" }}>Routing and WAN</h3><p className="muted">Cisco ISR and Catalyst 8000, Nokia SR OS</p></div>
            </div>
          </div>
        </section>

        <section className="sec white" aria-labelledby="tool-h">
          <div className="wrap split">
            <div><h2 id="tool-h">Try our free config generator</h2></div>
            <div>
              <p className="lead">Setting up a Cisco switch or router yourself? Henderson&apos;s Cisco Config Generator builds a clean starting configuration in your browser. Nothing you type is sent anywhere.</p>
              <p><a className="btn ghost" href="https://layeroneit.github.io/henderson-cisco-config-generator/" rel="noopener">Open the generator</a></p>
            </div>
          </div>
        </section>

        <section className="sec" aria-labelledby="nfaq-h">
          <div className="wrap split"><h2 id="nfaq-h">Network questions</h2><div className="faq"><details open><summary>How long does a firewall replacement take?</summary><p>For a typical small office, the cut-over itself takes a few hours and is scheduled outside business hours. Planning and pre-staging the new firewall happen beforehand, so the downtime window stays short.</p></details><details><summary>Do I need to buy new equipment?</summary><p>Not always. We start with what you have. If something needs replacing, you&apos;ll get a vendor-neutral recommendation and can buy it directly or through us.</p></details><details><summary>Can you separate guest Wi-Fi from our business network?</summary><p>Yes. Guest Wi-Fi, cameras, phones, payment terminals and staff devices can each live on their own segment with firewall rules between them.</p></details><details><summary>Do you set up VPNs for remote employees?</summary><p>Yes. We configure remote access VPNs and site-to-site VPNs between locations, with multi-factor authentication where your equipment supports it.</p></details><details><summary>Which towns do you cover on-site?</summary><p>In Wisconsin: Hartland, Pewaukee, Delafield, Oconomowoc, Sussex, Merton, Waukesha, Brookfield, Menomonee Falls, New Berlin, Wauwatosa and Milwaukee. In Illinois: Chicago and suburbs including Evanston, Skokie, Arlington Heights, Schaumburg, Oak Brook, Naperville and Lake Forest.</p></details></div></div>
        </section>
      </main>
      <ContactBand
        heading={"Get a free network review"}
        blurb={"Tell us how many people and locations you have, and what's frustrating you. We'll suggest next steps, even if that's \"leave it alone.\""}
      />
    </>
  );
}
