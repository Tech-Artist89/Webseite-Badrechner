import { Injectable } from '@angular/core';
import { BathroomData } from '../interfaces/badrechner';

// Note: This service would use jsPDF in a real implementation
// For now, it's a placeholder for PDF generation functionality

@Injectable({
  providedIn: 'root'
})
export class PdfGeneratorService {
  constructor() {}

  async generatePDF(data: BathroomData): Promise<Blob> {
    // This would use jsPDF in a real implementation
    // For now, we'll create a simple text blob as placeholder
    
    const content = this.generatePDFContent(data);
    return new Blob([content], { type: 'text/plain' });
  }

  private generatePDFContent(data: BathroomData): string {
    const selectedEquipment = data.equipment
      .filter(item => item.selected)
      .map(item => {
        const selectedOption = item.popupDetails.options.find(opt => opt.selected);
        return selectedOption ? `${item.name}: ${selectedOption.name}` : item.name;
      })
      .join('\n  ');

    return `
MITRA SANITÄR GMBH - BADKONFIGURATOR
====================================

Erstellt am: ${new Date().toLocaleDateString('de-DE')}

KONTAKTDATEN:
${data.contactData.salutation} ${data.contactData.firstName} ${data.contactData.lastName}
Telefon: ${data.contactData.phone}
E-Mail: ${data.contactData.email}

BADKONFIGURATION:
Badezimmergröße: ${data.bathroomSize} m²

AUSSTATTUNG:
${selectedEquipment || 'Keine Ausstattung ausgewählt'}

QUALITÄT:
${data.qualityLevel?.name || 'Nicht ausgewählt'}
${data.qualityLevel?.description || ''}

FLIESEN:
Bodenfliesen: ${data.floorTiles.join(', ') || 'Keine'}
Wandfliesen: ${data.wallTiles.join(', ') || 'Keine'}

HEIZUNG:
${data.heating.join(', ') || 'Keine Heizung ausgewählt'}

ZUSÄTZLICHE INFORMATIONEN:
${data.additionalInfo.join(', ') || 'Keine'}

ANMERKUNGEN:
${data.comments || 'Keine Anmerkungen'}

---
Mitra Sanitär GmbH
Borussiastraße 62a, 12103 Berlin
Tel: 030 76008921
E-Mail: hey@mitra-sanitaer.de
    `;
  }

  downloadPDF(data: BathroomData): void {
    this.generatePDF(data).then(blob => {
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `Mitra-Sanitär-Badkonfigurator_${data.contactData.lastName}_${new Date().toISOString().split('T')[0]}.txt`;
      link.click();
      window.URL.revokeObjectURL(url);
    });
  }
}