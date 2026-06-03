export type PresetId = 'photo' | 'signature' | 'custom';

export interface Preset {
  id: PresetId;
  width: number;
  height: number;
  minKB: number;
  maxKB: number;
  filename: string;
  buttonText: string;
}

export const PRESETS: Record<PresetId, Preset> = {
  photo: {
    id: 'photo',
    width: 420,
    height: 525,
    minKB: 10,
    maxKB: 20,
    filename: "resized-rto-photo",
    buttonText: "Resize RTO Photo",
  },
  signature: {
    id: 'signature',
    width: 256,
    height: 64,
    minKB: 10,
    maxKB: 20,
    filename: "resized-rto-signature",
    buttonText: "Resize RTO Signature",
  },
  custom: {
    id: 'custom',
    width: 420,
    height: 525,
    minKB: 1,
    maxKB: 20,
    filename: "custom-resized-image",
    buttonText: "Resize Custom Image",
  }
};
