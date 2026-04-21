/* eslint-disable @typescript-eslint/no-explicit-any */
class DownloadFunctions {
  downloadCsv(
    content: string,
    fileName: string,
    mimeType: string = "application/octet-stream",
  ): void {
    const a = document.createElement("a");

    // IE10+ support
    if ((navigator as any).msSaveBlob) {
      (navigator as any).msSaveBlob(
        new Blob([content], { type: mimeType }),
        fileName,
      );
      return;
    }

    // Modern browsers
    if (typeof URL !== "undefined" && "download" in a) {
      const blob = new Blob([content], { type: mimeType });
      const url = URL.createObjectURL(blob);

      a.href = url;
      a.setAttribute("download", fileName);
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      // ✅ important: prevent memory leak
      URL.revokeObjectURL(url);
      return;
    }

    // Fallback
    window.location.href =
      "data:application/octet-stream," + encodeURIComponent(content);
  }
}

const ADF = new DownloadFunctions();
export default ADF;
