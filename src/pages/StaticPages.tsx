import React from 'react';

export const About: React.FC = () => (
  <div className="page-container card">
    <h1>About Us</h1>
    <p>RTO Resizer India was built to solve the frustration of uploading images to the Indian Driving Licence (Sarathi Parivahan) portal.</p>
    <p>All processing is done directly in your browser. We respect your privacy and never upload any data to any servers.</p>
  </div>
);

export const Contact: React.FC = () => (
  <div className="page-container card">
    <h1>Contact</h1>
    <p>If you encounter issues or have feature requests, please reach out via GitHub issues or email.</p>
  </div>
);

export const Privacy: React.FC = () => (
  <div className="page-container card">
    <h1>Privacy Policy</h1>
    <p>We do not collect, store, or transmit your images. This is a 100% client-side application.</p>
  </div>
);

export const Terms: React.FC = () => (
  <div className="page-container card">
    <h1>Terms of Service</h1>
    <p>This tool is provided "as is" without warranty of any kind. Use at your own risk.</p>
  </div>
);
