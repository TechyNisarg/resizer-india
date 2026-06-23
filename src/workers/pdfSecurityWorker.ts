import { decryptPDF } from '@pdfsmaller/pdf-decrypt';
import { encryptPDF } from '@pdfsmaller/pdf-encrypt-lite';

self.onmessage = async (event: MessageEvent) => {
  const { action, pdfBytes, password } = event.data;
  
  try {
    if (action === 'decrypt') {
      const decryptedBytes = await decryptPDF(new Uint8Array(pdfBytes), password);
      // We pass the buffer in the transfer list to avoid copying
      (self as any).postMessage({ success: true, resultBytes: decryptedBytes }, [decryptedBytes.buffer]);
    } else if (action === 'encrypt') {
      const encryptedBytes = await encryptPDF(new Uint8Array(pdfBytes), password, password);
      (self as any).postMessage({ success: true, resultBytes: encryptedBytes }, [encryptedBytes.buffer]);
    } else {
      throw new Error('Unknown action');
    }
  } catch (error: any) {
    self.postMessage({ success: false, error: error.message || 'Operation failed' });
  }
};
