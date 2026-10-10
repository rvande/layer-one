import type { Metadata } from 'next';
import Link from 'next/link';
import { JsonLd } from '@/components/JsonLd';
import { Breadcrumbs } from '@/components/Breadcrumbs';
import { Mesh } from '@/components/Mesh';
import { ContactBand } from '@/components/ContactBand';
import { pageMetadata, pageJsonLd } from '@/lib/seo';

export const metadata: Metadata = pageMetadata('services');

export default function ServicesPage() {
  return (
    <>
      <JsonLd data={pageJsonLd('services')} />
      <Breadcrumbs items={[{"href":"/","label":"Home"},{"label":"Services"}]} />
      <main id="main">
        <section className="hero" style={{ paddingBottom: "2rem" }}><Mesh tone="light" />
          <div className="wrap" style={{ display: "block" }}>
            <h1 style={{ maxWidth: "17ch" }}>IT services for Wisconsin and Chicago businesses</h1>
            <p className="lead" style={{ marginTop: "1.4rem" }}>One engineer, five kinds of work. Pick the one that matches your problem, or book a call and we&apos;ll figure it out together.</p>
            <p style={{ marginTop: "1.5rem", display: "flex", flexWrap: "wrap", gap: ".5rem 1.5rem", fontWeight: "600" }}><a href="#network">Network &amp; security</a><a href="#software">Custom software &amp; apps</a><a href="#ai">AI &amp; automation</a><a href="#infrastructure">Infrastructure &amp; backups</a><a href="#advisory">Compliance &amp; advisory</a></p>
          </div>
        </section>
        <section className="sec" id="network" aria-labelledby="network-h">
          <div className="wrap split">
            <div><h2 id="network-h">Network &amp; security</h2><p className="layers" style={{ marginTop: ".8rem" }}>Layers 1&ndash;7</p></div>
            <div>
              <p className="lead">Design and install of firewalls, switches, Wi-Fi and VPNs, with segmentation so guests, phones and payment systems can&apos;t see each other.</p>
              <div className="two-col" style={{ marginTop: "2rem" }}>
                <div><h3 style={{ marginBottom: "1rem" }}>A good fit if</h3><ul className="ticks"><li>Your Wi-Fi drops or slows down when the office gets busy</li><li>Guests, cameras and staff all share one flat network</li><li>You&apos;re replacing an aging firewall or adding a location</li><li>Remote staff need secure access to the office</li></ul></div>
                <div><h3 style={{ marginBottom: "1rem" }}>What&apos;s included</h3><ul className="ticks"><li>Site assessment and network diagram</li><li>Firewall policy, VPN and remote access</li><li>Switch and VLAN design</li><li>Wireless planning and access point placement</li><li>Commented configuration backups</li></ul></div>
              </div>
              <p className="muted" style={{ marginTop: "1.75rem" }}><b style={{ color: "var(--ink)" }}>Typical tools:</b> Fortinet FortiGate, FortiSwitch and FortiAP; Cisco Catalyst and ISR; Palo Alto Networks; Arista</p>
              <p style={{ marginTop: "1.5rem" }}><Link className="btn ghost" href="/services/network-security-waukesha-county">Network and firewall services in Waukesha County</Link></p>
            </div>
          </div>
        </section><section className="sec white" id="software" aria-labelledby="software-h">
          <div className="wrap split">
            <div><h2 id="software-h">Custom software &amp; apps</h2><p className="layers" style={{ marginTop: ".8rem" }}>Layer 7</p></div>
            <div>
              <p className="lead">Web and mobile applications built to fit how your business actually works, from booking and payments to internal tools.</p>
              <div className="two-col" style={{ marginTop: "2rem" }}>
                <div><h3 style={{ marginBottom: "1rem" }}>A good fit if</h3><ul className="ticks"><li>You&apos;re paying for software that does half of what you need</li><li>Staff copy data between systems by hand</li><li>You want an app customers can download</li><li>You need a booking, scheduling or point-of-sale system</li></ul></div>
                <div><h3 style={{ marginBottom: "1rem" }}>What&apos;s included</h3><ul className="ticks"><li>Product planning and clickable prototypes</li><li>Web apps and mobile apps for iOS and Android</li><li>Payments, email and calendar integrations</li><li>Hosting, monitoring and updates</li></ul></div>
              </div>
              <p className="muted" style={{ marginTop: "1.75rem" }}><b style={{ color: "var(--ink)" }}>Typical tools:</b> React, Next.js, Node.js, TypeScript, PostgreSQL, Prisma, Drizzle, Capacitor, AWS</p>
      
            </div>
          </div>
        </section><section className="sec" id="ai" aria-labelledby="ai-h">
          <div className="wrap split">
            <div><h2 id="ai-h">AI &amp; automation</h2><p className="layers" style={{ marginTop: ".8rem" }}>Layer 7</p></div>
            <div>
              <p className="lead">Practical automation that drafts the repetitive work, such as summaries, replies and reports, and leaves the decisions to people.</p>
              <div className="two-col" style={{ marginTop: "2rem" }}>
                <div><h3 style={{ marginBottom: "1rem" }}>A good fit if</h3><ul className="ticks"><li>Your team spends hours on the same reports every week</li><li>You want to use AI but don&apos;t want customer data leaking</li><li>You need a daily brief pulled from several systems</li></ul></div>
                <div><h3 style={{ marginBottom: "1rem" }}>What&apos;s included</h3><ul className="ticks"><li>Workflow review to find the right first task</li><li>AI agents with human review built in</li><li>Integrations with Microsoft 365 and your existing tools</li><li>Guardrails for what data the AI can and can&apos;t touch</li></ul></div>
              </div>
              <p className="muted" style={{ marginTop: "1.75rem" }}><b style={{ color: "var(--ink)" }}>Typical tools:</b> Anthropic Claude, Google Gemini, Microsoft Copilot Studio, Cursor</p>
      
            </div>
          </div>
        </section><section className="sec white" id="infrastructure" aria-labelledby="infrastructure-h">
          <div className="wrap split">
            <div><h2 id="infrastructure-h">Infrastructure &amp; backups</h2><p className="layers" style={{ marginTop: ".8rem" }}>Layers 1&ndash;2</p></div>
            <div>
              <p className="lead">Servers, storage and backups sized for a small business, set up so restoring a file or a whole system is a routine job, not an emergency.</p>
              <div className="two-col" style={{ marginTop: "2rem" }}>
                <div><h3 style={{ marginBottom: "1rem" }}>A good fit if</h3><ul className="ticks"><li>You don&apos;t know when your last good backup was</li><li>A single old server runs everything</li><li>You want to move off a costly cloud subscription</li></ul></div>
                <div><h3 style={{ marginBottom: "1rem" }}>What&apos;s included</h3><ul className="ticks"><li>Virtualization hosts and containers</li><li>Network storage with versioned, automated backups</li><li>Tested restore procedures</li><li>Power and rack planning</li></ul></div>
              </div>
              <p className="muted" style={{ marginTop: "1.75rem" }}><b style={{ color: "var(--ink)" }}>Typical tools:</b> Proxmox, Docker, Synology, APC</p>
      
            </div>
          </div>
        </section><section className="sec" id="advisory" aria-labelledby="advisory-h">
          <div className="wrap split">
            <div><h2 id="advisory-h">Compliance &amp; advisory</h2><p className="layers" style={{ marginTop: ".8rem" }}>All layers</p></div>
            <div>
              <p className="lead">Plain-language technology plans and security reviews from an engineer who works under utility-grade compliance standards every day.</p>
              <div className="two-col" style={{ marginTop: "2rem" }}>
                <div><h3 style={{ marginBottom: "1rem" }}>A good fit if</h3><ul className="ticks"><li>You&apos;ve been asked about your security practices by a client or insurer</li><li>You&apos;re comparing vendors and quotes you can&apos;t evaluate</li><li>You need a technology roadmap for the next two to three years</li></ul></div>
                <div><h3 style={{ marginBottom: "1rem" }}>What&apos;s included</h3><ul className="ticks"><li>Security and configuration reviews</li><li>Vulnerability and patch process design</li><li>Vendor-neutral quote review</li><li>Technology roadmap and budget</li></ul></div>
              </div>
              <p className="muted" style={{ marginTop: "1.75rem" }}><b style={{ color: "var(--ink)" }}>Typical tools:</b> NIST CSF, NIST SP 800-53, NERC CIP experience, ITIL change management</p>
      
            </div>
          </div>
        </section>
        <section className="sec" aria-labelledby="sfaq-h">
          <div className="wrap split"><h2 id="sfaq-h">Working with us</h2><div className="faq"><details open><summary>How much does a project cost?</summary><p>It depends on scope, so every project starts with a free consultation and a written quote. Small office network refreshes and focused software builds are priced as fixed projects; ongoing support can be hourly or a monthly plan.</p></details><details><summary>Do you offer ongoing support?</summary><p>Yes. After a project you can keep us on for updates, monitoring of what we built, and changes as your business grows. There&apos;s no requirement to sign up for support to get a project done.</p></details><details><summary>Will I be locked in to Layer One?</summary><p>No. Every project ends with documentation, diagrams, configurations and admin access handed to you. Another engineer should be able to pick it up from what we leave behind.</p></details><details><summary>Do you work with home offices?</summary><p>Yes, especially home offices that handle business data or need a secure connection to an office network.</p></details><details><summary>Can you work with our existing IT provider?</summary><p>Yes. We often handle a specific project, such as a firewall replacement or a custom app, alongside an existing managed service provider.</p></details></div></div>
        </section>
      </main>
      <ContactBand
        heading={"Not sure which service you need?"}
        blurb={"Describe the problem in your own words. That's usually enough to point you in the right direction."}
      />
    </>
  );
}
