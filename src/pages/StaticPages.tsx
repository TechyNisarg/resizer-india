import React from 'react';

export const About: React.FC = () => (
  <div className="card" style={{ maxWidth: '800px', width: 'calc(100% - 2rem)', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h1 style={{ color: 'var(--text-primary)' }}>About Resizer India</h1>
    <p>Resizer India is a privacy first, client side utility built specifically to help citizens quickly resize and compress images for government portals (like RTO, Parivahan, PAN, SSC, and UPSC).</p>
    <p>Resizer India is free because it costs almost nothing to run — all processing happens on your device, so we have no servers, no storage, and no infrastructure to pay for. No ads, no data collection, no catch.</p>
    <p>We know how frustrating it is to deal with strict aspect ratios and maximum KB limits. This tool uses smart algorithms to ensure your image exactly matches the required specifications.</p>
  </div>
);

export const Privacy: React.FC = () => (
  <div className="card" style={{ maxWidth: '800px', width: 'calc(100% - 2rem)', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h1 style={{ color: 'var(--text-primary)' }}>Privacy Policy</h1>
    <p><strong>100% Client Side Processing</strong></p>
    <p>Your privacy is our utmost priority. All image cropping, resizing, and compression happens entirely within your web browser. <strong>Your images never leave your device.</strong></p>
    <p>We do not run servers that store or process your image data. To help us understand website traffic and improve the tool, we use privacy-friendly Vercel Web Analytics. This service gathers anonymous visitor statistics (such as page views and browser types) without using any cookies, storing personal data, or tracking you across different websites.</p>
  </div>
);

export const Terms: React.FC = () => (
  <div className="card" style={{ maxWidth: '800px', width: 'calc(100% - 2rem)', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h1 style={{ color: 'var(--text-primary)' }}>Terms of Service</h1>
    <p>This tool is provided "as is" without warranty of any kind. By using Resizer India, you agree that you are solely responsible for verifying the accuracy and acceptance of your generated images on official government portals.</p>
  </div>
);

export const Contact: React.FC = () => (
  <div className="card" style={{ maxWidth: '800px', width: 'calc(100% - 2rem)', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h1 style={{ color: 'var(--text-primary)' }}>Contact Us</h1>
    <p>If you encounter any issues or have feature requests (like adding a new government form preset), please let us know!</p>
    <p>
      Open an issue on GitHub:{' '}
      <a href="https://github.com/TechyNisarg/resizer-india/issues" target="_blank" rel="noreferrer">
        TechyNisarg/resizer-india
      </a>
    </p>
  </div>
);

export const FAQ: React.FC = () => (
  <div className="card" style={{ maxWidth: '800px', width: 'calc(100% - 2rem)', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
    <h1 style={{ color: 'var(--text-primary)' }}>Frequently Asked Questions</h1>
    
    <div>
      <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Are my images secure?</h3>
      <p style={{ color: 'var(--text-secondary)' }}>Yes. Resizer India is a 100% client side tool. This means all processing happens directly in your browser. Your images are never uploaded to any server or stored anywhere.</p>
    </div>

    <div>
      <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>When something is free, you're the product. What's the catch here?</h3>
      <p style={{ color: 'var(--text-secondary)' }}>There is no catch. Unlike other tools that need to pay for servers to store and process your files, Resizer India runs entirely inside your browser. Since we have zero server costs, zero storage costs, and no business model, we don't need to run ads or collect your data. It is just a free, open source side project.</p>
    </div>

    <div>
      <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Is this tool free?</h3>
      <p style={{ color: 'var(--text-secondary)' }}>Yes, absolutely free with no hidden charges or watermarks.</p>
    </div>

    <div>
      <h3 style={{ color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Will it reduce image quality?</h3>
      <p style={{ color: 'var(--text-secondary)' }}>We use smart compression algorithms to hit strict file size limits (like 20KB or 50KB) while maintaining the highest possible visual fidelity. The quality is perfect for portal uploads.</p>
    </div>
  </div>
);
