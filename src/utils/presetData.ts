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
      'Size: strictly between 10KB and 20KB',
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
      'Size: strictly between 10KB and 20KB',
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
      'Size: max 50KB',
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
      'Size: max 50KB',
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
      'Size: strictly under 240KB',
      'Plain white or off-white background'
    ],
    filename: 'passport-photo',
    buttonText: 'Resize Passport Photo',
    hasFaceGuide: true
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
