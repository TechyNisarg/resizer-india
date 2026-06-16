import React from 'react';

export const About: React.FC = () => (
  <div className="card" style={{ maxWidth: '800px', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h1 style={{ color: 'var(--text-primary)' }}>About Resizer India</h1>
    <p>Resizer India is a privacy-first, client-side utility built specifically to help citizens quickly resize and compress images for government portals (like RTO, Parivahan, PAN, SSC, and UPSC).</p>
    <p>We know how frustrating it is to deal with strict aspect ratios and maximum KB limits. This tool uses smart algorithms to ensure your image exactly matches the required specifications.</p>
  </div>
);

export const Privacy: React.FC = () => (
  <div className="card" style={{ maxWidth: '800px', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h1 style={{ color: 'var(--text-primary)' }}>Privacy Policy</h1>
    <p><strong>100% Client-Side Processing</strong></p>
    <p>Your privacy is our utmost priority. All image cropping, resizing, and compression happens entirely within your web browser. <strong>Your images never leave your device.</strong></p>
    <p>We do not run servers that store or process your image data. To help us understand website traffic and improve the tool, we use privacy-friendly Vercel Web Analytics. This service gathers anonymous visitor statistics (such as page views and browser types) without using any cookies, storing personal data, or tracking you across different websites.</p>
  </div>
);

export const Terms: React.FC = () => (
  <div className="card" style={{ maxWidth: '800px', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h1 style={{ color: 'var(--text-primary)' }}>Terms of Service</h1>
    <p>This tool is provided "as is" without warranty of any kind. By using Resizer India, you agree that you are solely responsible for verifying the accuracy and acceptance of your generated images on official government portals.</p>
  </div>
);

export const Contact: React.FC = () => (
  <div className="card" style={{ maxWidth: '800px', margin: '2rem auto', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
    <h1 style={{ color: 'var(--text-primary)' }}>Contact Us</h1>
    <p>If you encounter any issues or have feature requests (like adding a new government form preset), please let us know!</p>
    <p>Email: <strong>support@resizerindia.example.com</strong></p>
  </div>
);
