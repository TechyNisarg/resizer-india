export type PresetCategory = 'rto' | 'pan' | 'ssc' | 'upsc' | 'passport' | 'ibps' | 'rrb' | 'neet' | 'acpc' | 'state-psc' | 'defence' | 'custom';
export type PresetType = 'photo' | 'signature' | 'thumb' | 'handwritten' | 'postcard' | 'custom';

export interface Preset {
  id: string;
  category: PresetCategory;
  type: PresetType;
  width: number;
  height: number;
  minKB: number;
  maxKB: number;
  instructions: string[];
  filename: string;
  buttonText: string;
  hasFaceGuide?: boolean;
  hasOverlayOption?: boolean;
}

export const PRESETS: Preset[] = [
  {
    id: 'rto-photo',
    category: 'rto',
    type: 'photo',
    width: 420,
    height: 525,
    minKB: 10,
    maxKB: 20,
    instructions: [
      'Width: 420px, Height: 525px',
      'Final Output Size: 10-20KB',
      'Face should cover 70-80% of the photo'
    ],
    filename: 'rto-photo',
    buttonText: 'Resize RTO Photo',
    hasFaceGuide: true
  },

  {
    id: 'rto-signature',
    category: 'rto',
    type: 'signature',
    width: 256,
    height: 64,
    minKB: 10,
    maxKB: 20,
    instructions: [
      'Width: 256px, Height: 64px',
      'Final Output Size: 10-20KB',
      'Sign with black/blue pen on white paper'
    ],
    filename: 'rto-signature',
    buttonText: 'Resize RTO Signature'
  },
  {
    id: 'pan-photo',
    category: 'pan',
    type: 'photo',
    width: 213,
    height: 213,
    minKB: 20,
    maxKB: 50,
    instructions: [
      'Width: 213px, Height: 213px (3.5cm x 3.5cm at 300DPI)',
      'Final Output Size: Max 50KB',
      'Background should be plain white'
    ],
    filename: 'pan-photo',
    buttonText: 'Resize PAN Photo',
    hasFaceGuide: true
  },
  {
    id: 'pan-signature',
    category: 'pan',
    type: 'signature',
    width: 400,
    height: 200,
    minKB: 10,
    maxKB: 50,
    instructions: [
      'Aspect Ratio: 2:1',
      'Final Output Size: Max 50KB',
      'Sign in the center'
    ],
    filename: 'pan-signature',
    buttonText: 'Resize PAN Signature'
  },
  {
    id: 'passport-photo',
    category: 'passport',
    type: 'photo',
    width: 600,
    height: 600,
    minKB: 10,
    maxKB: 240,
    instructions: [
      'Width: 600px, Height: 600px (2x2 inches at 300DPI)',
      'Final Output Size: Max 240KB',
      'Plain white or off-white background'
    ],
    filename: 'passport-photo',
    buttonText: 'Resize Passport Photo',
    hasFaceGuide: true
  },
  {
    id: 'ssc-photo',
    category: 'ssc',
    type: 'photo',
    width: 413,
    height: 531,
    minKB: 20,
    maxKB: 50,
    instructions: [
      'Width: 3.5cm, Height: 4.5cm (approx 413x531 px)',
      'Final Output Size: 20-50KB',
      'No spectacles, cap, or dark glasses allowed'
    ],
    filename: 'ssc-photo',
    buttonText: 'Resize SSC Photo',
    hasFaceGuide: true,
    hasOverlayOption: true
  },
  {
    id: 'ssc-signature',
    category: 'ssc',
    type: 'signature',
    width: 472,
    height: 236,
    minKB: 10,
    maxKB: 20,
    instructions: [
      'Width: 4.0cm, Height: 2.0cm (approx 472x236 px)',
      'Final Output Size: 10-20KB',
      'Sign horizontally on white paper with black/blue ink'
    ],
    filename: 'ssc-signature',
    buttonText: 'Resize SSC Signature'
  },
  {
    id: 'ssc-thumb',
    category: 'ssc',
    type: 'thumb',
    width: 472,
    height: 354,
    minKB: 10,
    maxKB: 30,
    instructions: [
      'Width: 4.0cm, Height: 3.0cm (approx 472x354 px)',
      'Final Output Size: 10-30KB',
      'Left thumb impression on white paper'
    ],
    filename: 'ssc-thumb',
    buttonText: 'Resize SSC Thumb'
  },
  {
    id: 'upsc-photo',
    category: 'upsc',
    type: 'photo',
    width: 350,
    height: 350,
    minKB: 20,
    maxKB: 300,
    instructions: [
      'Min dimensions: 350x350 px',
      'Final Output Size: 20-300KB',
      'At least 3/4th of the photo should be the face'
    ],
    filename: 'upsc-photo',
    buttonText: 'Resize UPSC Photo',
    hasFaceGuide: true
  },
  {
    id: 'upsc-signature',
    category: 'upsc',
    type: 'signature',
    width: 350,
    height: 350,
    minKB: 20,
    maxKB: 300,
    instructions: [
      'Min dimensions: 350x350 px',
      'Final Output Size: 20-300KB',
      'Sign horizontally on white paper'
    ],
    filename: 'upsc-signature',
    buttonText: 'Resize UPSC Signature'
  },
  {
    id: 'ibps-photo',
    category: 'ibps',
    type: 'photo',
    width: 413,
    height: 531,
    minKB: 20,
    maxKB: 50,
    instructions: [
      'Dimensions: 4.5cm x 3.5cm (approx 413x531 px)',
      'Final Output Size: 20-50KB',
      'Recent passport style colour picture'
    ],
    filename: 'ibps-photo',
    buttonText: 'Resize IBPS Photo',
    hasFaceGuide: true
  },
  {
    id: 'ibps-signature',
    category: 'ibps',
    type: 'signature',
    width: 140,
    height: 60,
    minKB: 10,
    maxKB: 20,
    instructions: [
      'Dimensions: 140x60 pixels',
      'Final Output Size: 10-20KB',
      'Sign on white paper with Black Ink pen'
    ],
    filename: 'ibps-signature',
    buttonText: 'Resize IBPS Signature'
  },
  {
    id: 'ibps-thumb',
    category: 'ibps',
    type: 'thumb',
    width: 240,
    height: 240,
    minKB: 20,
    maxKB: 50,
    instructions: [
      'Dimensions: 240x240 pixels',
      'Final Output Size: 20-50KB',
      'Left thumb impression on white paper with black/blue ink'
    ],
    filename: 'ibps-thumb',
    buttonText: 'Resize IBPS Thumb'
  },
  {
    id: 'ibps-handwritten',
    category: 'ibps',
    type: 'handwritten',
    width: 800,
    height: 400,
    minKB: 50,
    maxKB: 100,
    instructions: [
      'Dimensions: 800x400 pixels',
      'Final Output Size: 50-100KB',
      'Write on white paper with black ink'
    ],
    filename: 'ibps-declaration',
    buttonText: 'Resize Declaration'
  },
  {
    id: 'rrb-photo',
    category: 'rrb',
    type: 'photo',
    width: 413,
    height: 531,
    minKB: 20,
    maxKB: 50,
    instructions: [
      'Dimensions: 35mm x 45mm',
      'Final Output Size: 20-50KB',
      'Strict white background, no glasses'
    ],
    filename: 'rrb-photo',
    buttonText: 'Resize RRB Photo',
    hasFaceGuide: true
  },
  {
    id: 'rrb-signature',
    category: 'rrb',
    type: 'signature',
    width: 590,
    height: 236,
    minKB: 10,
    maxKB: 40,
    instructions: [
      'Dimensions: 50mm x 20mm',
      'Final Output Size: 10-40KB',
      'Sign on white paper with black ink pen'
    ],
    filename: 'rrb-signature',
    buttonText: 'Resize RRB Signature'
  },
  {
    id: 'neet-photo',
    category: 'neet',
    type: 'photo',
    width: 413,
    height: 531,
    minKB: 10,
    maxKB: 200,
    instructions: [
      'Passport size, Final Output Size: 10-200KB',
      '80% face coverage, ears clearly visible',
      'White background'
    ],
    filename: 'neet-photo',
    buttonText: 'Resize NEET Photo',
    hasFaceGuide: true
  },
  {
    id: 'neet-postcard',
    category: 'neet',
    type: 'postcard',
    width: 600,
    height: 900,
    minKB: 10,
    maxKB: 200,
    instructions: [
      'Postcard size (4x6 inches)',
      'Final Output Size: 10-200KB',
      'White background, 80% face coverage'
    ],
    filename: 'neet-postcard',
    buttonText: 'Resize NEET Postcard',
    hasFaceGuide: true
  },
  {
    id: 'neet-signature',
    category: 'neet',
    type: 'signature',
    width: 256,
    height: 64,
    minKB: 4,
    maxKB: 30,
    instructions: [
      'Final Output Size: 4-30KB',
      'Sign horizontally on white paper'
    ],
    filename: 'neet-signature',
    buttonText: 'Resize NEET Signature'
  },
  {
    id: 'neet-thumb',
    category: 'neet',
    type: 'thumb',
    width: 600,
    height: 400,
    minKB: 10,
    maxKB: 200,
    instructions: [
      'Left and Right hand fingers and thumb impression',
      'Final Output Size: 10-200KB'
    ],
    filename: 'neet-thumb',
    buttonText: 'Resize NEET Thumb'
  },
  {
    id: 'acpc-photo',
    category: 'acpc',
    type: 'photo',
    width: 413,
    height: 531,
    minKB: 10,
    maxKB: 200,
    instructions: [
      'Final Output Size: 10-200KB',
      'JPG format required'
    ],
    filename: 'acpc-photo',
    buttonText: 'Resize ACPC Photo',
    hasFaceGuide: true
  },
  {
    id: 'acpc-signature',
    category: 'acpc',
    type: 'signature',
    width: 400,
    height: 200,
    minKB: 10,
    maxKB: 200,
    instructions: [
      'Final Output Size: 10-200KB',
      'JPG format required'
    ],
    filename: 'acpc-signature',
    buttonText: 'Resize ACPC Signature'
  },
  {
    id: 'state-psc-photo',
    category: 'state-psc',
    type: 'photo',
    width: 350,
    height: 450,
    minKB: 20,
    maxKB: 50,
    instructions: [
      'Width: 3.5cm, Height: 4.5cm',
      'Final Output Size: 20-50KB',
      'Plain white background, no glasses'
    ],
    filename: 'state-psc-photo',
    buttonText: 'Resize PSC Photo',
    hasFaceGuide: true,
    hasOverlayOption: true
  },
  {
    id: 'state-psc-signature',
    category: 'state-psc',
    type: 'signature',
    width: 256,
    height: 64,
    minKB: 10,
    maxKB: 20,
    instructions: [
      'Final Output Size: 10-20KB',
      'Sign with black pen on white paper'
    ],
    filename: 'state-psc-signature',
    buttonText: 'Resize PSC Signature'
  },
  {
    id: 'defence-photo',
    category: 'defence',
    type: 'photo',
    width: 350,
    height: 450,
    minKB: 10,
    maxKB: 40,
    instructions: [
      'Width: 3.5cm, Height: 4.5cm',
      'Final Output Size: 10-40KB',
      'Light background, formal attire'
    ],
    filename: 'defence-photo',
    buttonText: 'Resize Defence Photo',
    hasFaceGuide: true,
    hasOverlayOption: true
  },
  {
    id: 'defence-signature',
    category: 'defence',
    type: 'signature',
    width: 256,
    height: 64,
    minKB: 5,
    maxKB: 10,
    instructions: [
      'Final Output Size: 5-10KB',
      'Sign with black pen on white paper'
    ],
    filename: 'defence-signature',
    buttonText: 'Resize Defence Signature'
  },
  {
    id: 'custom-preset',
    category: 'custom',
    type: 'custom',
    width: 500,
    height: 500,
    minKB: 0,
    maxKB: 100,
    instructions: [
      'Set your custom dimensions and max size',
      'The resizer will adjust quality to fit within limits'
    ],
    filename: 'custom-image',
    buttonText: 'Resize Custom Image'
  }
];

export const getPresetsByCategory = (cat: PresetCategory) => {
  return PRESETS.filter(p => p.category === cat);
};
