import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';


export const generateInvoicePDF = async (pemesananData) => {
    if (!pemesananData) return;

    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 800]);

    const font = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const black = rgb(0, 0, 0);
    const gray = rgb(0.5, 0.5, 0.5);

    const logoUrl = '/logo.png';
    try {
        const logoImageBytes = await fetch(logoUrl).then(res => res.arrayBuffer());
        const logoImage = await pdfDoc.embedPng(logoImageBytes);

        const { width, height } = logoImage.scale(0.15);

        page.drawImage(logoImage, {
            x: 35,
            y: 710,
            width,
            height
        });
    } catch (error) {
        console.error("Error loading logo image:", error);
    }

    page.drawText('INVOICE', {
        x: 110,
        y: 735,
        size: 18,
        font,
        color: black
    });

    page.drawText(`Tanggal:`, {
        x: 510,
        y: 745,
        size: 12,
        font,
        color: black
    });

    page.drawText(new Date().toLocaleDateString(), {
        x: 500,
        y: 725,
        size: 12,
        fontRegular,
        color: gray
    });

    page.drawLine({
        start: { x: 40, y: 698 },
        end: { x: 560, y: 698 },
        thickness: 1,
        color: gray
    });

    page.drawText('KEPADA:', {
        x: 50,
        y: 675,
        size: 12,
        font,
        color: black
    });

    page.drawText(pemesananData?.Data_Pengguna?.Nama_Lengkap_Penerima, {
        x: 50,
        y: 660,
        size: 12,
        fontRegular,
        color: gray
    });

    page.drawText(pemesananData?.Data_Pengguna?.Email, {
        x: 50,
        y: 645,
        size: 12,
        fontRegular,
        color: gray
    });

    page.drawText('No Pesanan:', {
        x: 485,
        y: 675,
        size: 12,
        font,
        color: black
    });

    page.drawText(pemesananData?.ID_Pemesanan, {
        x: 460,
        y: 660,
        size: 12,
        fontRegular,
        color: gray
    });

    const tableStartY = 600;
    page.drawText('Description', { x: 50, y: tableStartY, size: 12, font, color: black });
    page.drawText('Quantity', { x: 250, y: tableStartY, size: 12, font, color: black });
    page.drawText('Price', { x: 350, y: tableStartY, size: 12, font, color: black });
    page.drawText('Total', { x: 450, y: tableStartY, size: 12, font, color: black });
    page.drawLine({
        start: { x: 50, y: 595 },
        end: { x: 540, y: 595 },
        thickness: 2,
        color: gray
    });

    let lastYPosition = tableStartY;
    pemesananData?.Data_Pesanan?.forEach((item, index) => {
        const yPosition = tableStartY - (index + 1) * 23;
        lastYPosition = yPosition;

        page.drawText(item.Nama, { x: 50, y: yPosition, size: 12, fontRegular, color: gray });
        page.drawText(item.Kuantitas.toString(), { x: 250, y: yPosition, size: 12, fontRegular, color: gray });
        page.drawText(`Rp${item.Harga.toLocaleString()}`, { x: 350, y: yPosition, size: 12, fontRegular, color: gray });
        page.drawText(`Rp${(item.Harga * item.Kuantitas).toLocaleString()}`, { x: 450, y: yPosition, size: 12, fontRegular, color: gray });
    });

    page.drawLine({
        start: { x: 430, y: lastYPosition - 10 },
        end: { x: 540, y: lastYPosition - 10 },
        thickness: 1,
        color: gray
    });

    const summaryStartY = tableStartY - (pemesananData?.Data_Pesanan?.length || 0) * 20 - 30;
    page.drawText(`Subtotal: Rp${pemesananData?.Sub_Total?.toLocaleString()}`, {
        x: 430,
        y: summaryStartY,
        size: 12,
        font,
        color: black
    });

    page.drawText(`Total: Rp${pemesananData?.Total?.toLocaleString()}`, {
        x: 443,
        y: summaryStartY - 20,
        size: 12,
        font,
        color: black
    });

    page.drawText('TERIMAKASIH ATAS', {
        x: 50,
        y: 100,
        size: 12,
        font,
        color: gray
    });

    page.drawText('PEMBELIAN ANDA', {
        x: 50,
        y: 85,
        size: 12,
        font,
        color: gray
    });

    const pdfBytes = await pdfDoc.save();

    const link = document.createElement('a');
    link.href = URL.createObjectURL(new Blob([pdfBytes], { type: 'application/pdf' }));
    link.download = `FakturNdaru_${pemesananData?.Data_Pengguna?.Nama_Lengkap_Penerima}.pdf`;
    link.click();
};
