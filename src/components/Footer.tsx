import Image from 'next/image';
import Link from 'next/link';
import { CONTACT_EMAIL } from '@/lib/seo';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div>
          <Image src="/assets/layer-one-light.png" alt="Layer One" width={913} height={68} />
          <address>
            Layer One IT Consultants LLC
            <br />
            Hartland, Wisconsin 53029
            <br />
            <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
          </address>
        </div>
        <div>
          <h3>Services</h3>
          <ul>
            <li><Link href="/services/network-security-waukesha-county">Network &amp; security</Link></li>
            <li><Link href="/services#software">Custom software &amp; apps</Link></li>
            <li><Link href="/services#ai">AI &amp; automation</Link></li>
            <li><Link href="/services#infrastructure">Infrastructure &amp; backups</Link></li>
            <li><Link href="/services#advisory">Compliance &amp; advisory</Link></li>
          </ul>
        </div>
        <div>
          <h3>Company</h3>
          <ul>
            <li><Link href="/work">Work</Link></li>
            <li><Link href="/about/joseph-henderson">About Joseph</Link></li>
            <li><Link href="/#area">Service area</Link></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </div>
        <div>
          <h3>Elsewhere</h3>
          <ul>
            <li><a href="https://github.com/layeroneit" rel="noopener">GitHub</a></li>
            <li><a href="https://layeroneit.github.io/henderson-cisco-config-generator/" rel="noopener">Cisco config generator</a></li>
            <li><a href="https://tagmenow.app" rel="noopener">Tag, You&apos;re It</a></li>
          </ul>
        </div>
        <p className="legal">
          &copy; {new Date().getFullYear()} Layer One IT Consultants LLC. Serving Hartland, Lake Country, Waukesha County,
          Milwaukee, Chicago and the Chicago suburbs.
        </p>
      </div>
    </footer>
  );
}
