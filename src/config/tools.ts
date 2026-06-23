import { Car, CreditCard, Plane, BookOpen, Landmark, Train, Stethoscope, GraduationCap, Medal, FileText, Minimize2, Sliders } from 'lucide-react';

export const CATEGORIES = [
  { id: 'rto', label: 'RTO / Parivahan', icon: Car, color: '#eab308', bg: 'rgba(234, 179, 8, 0.1)', desc: '• Photo: 3.5x4.5 cm\n• Sign: 256x64 px\n• Size: 10KB - 20KB\n• Portals: Vahan, Sarathi', path: '/rto-photo-resizer' },
  { id: 'pan', label: 'PAN Card', icon: CreditCard, color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.1)', desc: '• Photo: 213x213 px\n• Sign: 400x200 px\n• Size: Max 50KB\n• Portals: NSDL, UTIITSL', path: '/pan-card-photo-resizer' },
  { id: 'passport', label: 'Passport Photo', icon: Plane, color: '#14b8a6', bg: 'rgba(20, 184, 166, 0.1)', desc: '• Size: 2x2 inch (51x51mm)\n• Background: White\n• Format: JPEG\n• Uses: OCI, Passport Seva', path: '/passport-photo-resizer' },
  { id: 'ssc', label: 'SSC Exams', icon: BookOpen, color: '#8b5cf6', bg: 'rgba(139, 92, 246, 0.1)', desc: '• Photo: 3.5x4.5 cm (20-50KB)\n• Sign: 4.0x2.0 cm (10-20KB)\n• Thumb: 10-30KB\n• Strict format enforced', path: '/ssc-photo-resizer' },
  { id: 'upsc', label: 'UPSC Exams', icon: BookOpen, color: '#ef4444', bg: 'rgba(239, 68, 68, 0.1)', desc: '• Photo & Sign: 350x350 px (Min)\n• Max Size: 1000x1000 px\n• File Size: 20KB - 300KB\n• Bit Depth: 24-bit', path: '/upsc-photo-resizer' },
  { id: 'ibps', label: 'IBPS/SBI Exams', icon: Landmark, color: '#10b981', bg: 'rgba(16, 185, 129, 0.1)', desc: '• Photo: 4.5x3.5 cm (20-50KB)\n• Sign: 140x60 px (10-20KB)\n• Thumb: 20-50KB\n• Declaration: 50-100KB', path: '/ibps-photo-resizer' },
  { id: 'rrb', label: 'Railway (RRB)', icon: Train, color: '#f97316', bg: 'rgba(249, 115, 22, 0.1)', desc: '• Photo: 35x45 mm (20-50KB)\n• Background: White only\n• Sign: 50x20 mm (10-40KB)\n• Format: JPG/JPEG', path: '/rrb-photo-resizer' },
  { id: 'neet', label: 'NEET / NTA', icon: Stethoscope, color: '#06b6d4', bg: 'rgba(6, 182, 212, 0.1)', desc: '• Passport: 10-200KB\n• Postcard: 4x6 inch (10-200KB)\n• Sign: 4-30KB\n• Thumb: 10-200KB', path: '/neet-photo-resizer' },
  { id: 'acpc', label: 'ACPC Admission', icon: GraduationCap, color: '#ec4899', bg: 'rgba(236, 72, 153, 0.1)', desc: '• Photo: 10-50KB\n• Sign: 10-50KB\n• Format: JPG/JPEG\n• Uses: GUJCET, Engineering', path: '/acpc-photo-resizer' },
  { id: 'state-psc', label: 'State PSCs', icon: Landmark, color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.1)', desc: '• Photo: 3.5x4.5 cm (20-50KB)\n• Sign: 10-20KB\n• Portals: MPSC, WBCS, KPSC, etc.', path: '/state-psc-photo-resizer' },
  { id: 'defence', label: 'Defence / Army', icon: Medal, color: '#16a34a', bg: 'rgba(22, 163, 74, 0.1)', desc: '• Photo: 10-40KB\n• Sign: 5-10KB\n• Uses: Agniveer, NDA, CDS', path: '/defence-photo-resizer' },
];

import { Lock, Copy, ImageIcon } from 'lucide-react';

export const IMAGE_TOOLS = [
  {
    id: 'custom',
    label: 'Custom Tool',
    icon: Sliders,
    color: '#64748b',
    bg: 'rgba(100, 116, 139, 0.1)',
    desc: '• Custom Width & Height\n• Exact KB Compression\n• Ratio Preserving\n• Manual Cropping',
    path: '/custom-resizer'
  },
  {
    id: 'compressor',
    label: 'Image Compressor',
    icon: Minimize2,
    color: '#0ea5e9',
    bg: 'rgba(14, 165, 233, 0.1)',
    desc: '• Just reduce file size (KB)\n• Keeps original dimensions\n• No cropping needed\n• Extremely simple',
    path: '/image-compressor'
  },
  {
    id: 'heic-to-jpg',
    label: 'HEIC to JPG',
    icon: ImageIcon,
    color: '#10b981',
    bg: 'rgba(16, 185, 129, 0.1)',
    desc: '• Convert iPhone .heic to .jpg\n• Fully client-side\n• Fast and private',
    path: '/heic-to-jpg'
  }
];

export const PDF_TOOLS = [
  {
    id: 'pdf-compressor',
    label: 'PDF Compressor',
    icon: FileText,
    color: '#ef4444',
    bg: 'rgba(239, 68, 68, 0.1)',
    desc: '• Compress PDF file size to strict KB limits.\n• 100% secure client-side processing.',
    path: '/pdf-compressor'
  },
  {
    id: 'pdf-merger',
    label: 'PDF Merger',
    icon: Copy,
    color: '#8b5cf6',
    bg: 'rgba(139, 92, 246, 0.1)',
    desc: '• Combine multiple images and PDFs.\n• Reorder and delete pages.\n• Single optimized output.',
    path: '/pdf-merger'
  },
  {
    id: 'pdf-security',
    label: 'PDF Lock & Unlock',
    icon: Lock,
    color: '#f59e0b',
    bg: 'rgba(245, 158, 11, 0.1)',
    desc: '• Remove passwords from Aadhaar or Bank PDFs.\n• Password-protect your private documents.',
    path: '/pdf-security'
  }
];
