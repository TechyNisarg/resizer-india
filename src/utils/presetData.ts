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
  dpi?: number;
  filename: string;
  buttonText: string;
  instructions: string[];
}

export const CATEGORIES = [
  { id: 'rto', label: 'Driving Licence (RTO)' },
  { id: 'pan', label: 'PAN Card' },
  { id: 'ssc', label: 'SSC / Govt Exams' },
  { id: 'upsc', label: 'UPSC Exams' },
  { id: 'passport', label: 'Indian Passport' },
  { id: 'custom', label: 'Custom Size' }
];

export const PRESETS: Preset[] = [
  // RTO
  { id: 'rto-photo', category: 'rto', type: 'photo', width: 420, height: 525, minKB: 10, maxKB: 20, filename: 'rto-photo', buttonText: 'Resize RTO Photo', instructions: ['Output size: 420 x 525 px', 'File size: 10KB to 20KB', 'Light/white background'] },
  { id: 'rto-signature', category: 'rto', type: 'signature', width: 256, height: 64, minKB: 10, maxKB: 20, filename: 'rto-signature', buttonText: 'Resize RTO Signature', instructions: ['Output size: 256 x 64 px', 'File size: 10KB to 20KB', 'Black/blue ink on white paper'] },
  
  // PAN
  { id: 'pan-photo', category: 'pan', type: 'photo', width: 213, height: 213, minKB: 10, maxKB: 30, dpi: 200, filename: 'pan-photo', buttonText: 'Resize PAN Photo', instructions: ['Output size: 213 x 213 px', 'File size: < 30KB', 'DPI: 200 DPI applied automatically'] },
  { id: 'pan-signature', category: 'pan', type: 'signature', width: 1040, height: 72, minKB: 10, maxKB: 60, dpi: 200, filename: 'pan-signature', buttonText: 'Resize PAN Signature', instructions: ['Output size: 1040 x 72 px', 'File size: < 60KB', 'DPI: 200 DPI applied automatically'] },
  
  // SSC
  { id: 'ssc-photo', category: 'ssc', type: 'photo', width: 413, height: 531, minKB: 20, maxKB: 50, filename: 'ssc-photo', buttonText: 'Resize SSC Photo', instructions: ['Output size: 3.5cm x 4.5cm (413x531 px)', 'File size: 20KB to 50KB', 'Without spectacles or cap'] },
  { id: 'ssc-signature', category: 'ssc', type: 'signature', width: 472, height: 236, minKB: 10, maxKB: 20, filename: 'ssc-signature', buttonText: 'Resize SSC Signature', instructions: ['Output size: 4.0cm x 2.0cm (472x236 px)', 'File size: 10KB to 20KB', 'Horizontal orientation'] },
  { id: 'ssc-thumb', category: 'ssc', type: 'thumb', width: 472, height: 354, minKB: 10, maxKB: 30, filename: 'ssc-thumb', buttonText: 'Resize SSC Thumb', instructions: ['Output size: 4.0cm x 3.0cm', 'File size: 10KB to 30KB', 'Left Thumb Impression'] },
  
  // UPSC
  { id: 'upsc-photo', category: 'upsc', type: 'photo', width: 350, height: 350, minKB: 20, maxKB: 300, filename: 'upsc-photo', buttonText: 'Resize UPSC Photo', instructions: ['Min size: 350x350 px', 'File size: 20KB to 300KB'] },
  { id: 'upsc-signature', category: 'upsc', type: 'signature', width: 350, height: 350, minKB: 20, maxKB: 300, filename: 'upsc-signature', buttonText: 'Resize UPSC Signature', instructions: ['Min size: 350x350 px', 'File size: 20KB to 300KB'] },
  
  // Passport
  { id: 'passport-photo', category: 'passport', type: 'photo', width: 600, height: 600, minKB: 50, maxKB: 1000, dpi: 300, filename: 'passport-photo', buttonText: 'Resize Passport Photo', instructions: ['Standard Indian Passport (51x51mm / 2x2 in)', 'White background', 'File size: under 1MB', 'DPI: 300 DPI applied automatically'] },
  
  // Custom
  { id: 'custom-size', category: 'custom', type: 'custom', width: 420, height: 525, minKB: 1, maxKB: 50, filename: 'custom-resized', buttonText: 'Resize Custom Image', instructions: ['Set exact width, height, and KB size', 'Useful for any other online portal'] }
];

export const getPresetById = (id: string): Preset | undefined => {
  return PRESETS.find(p => p.id === id);
};

export const getPresetsByCategory = (category: PresetCategory): Preset[] => {
  return PRESETS.filter(p => p.category === category);
};
