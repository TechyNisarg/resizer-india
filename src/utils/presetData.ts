export type PresetCategory = 'rto' | 'pan' | 'ssc' | 'upsc' | 'passport' | 'custom';
export type PresetType = 'photo' | 'signature' | 'thumb' | 'custom';

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
    hasFaceGuide: true
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
