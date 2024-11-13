export const downloadSVG = (
  data: React.MutableRefObject<HTMLDivElement | null>,
  key: string
) => {
  const svgElement = data.current?.querySelector("svg");

  if (svgElement) {
    const svgData = new XMLSerializer().serializeToString(svgElement);

    const fileBlob = new Blob([svgData], {
      type: "image/svg+xml;charset=utf-8",
    });
    const fileURL = URL.createObjectURL(fileBlob);

    const a = document.createElement("a");
    a.href = fileURL;
    a.download = `${key}.svg`;
    a.click();
  }
};

export const downloadXLSX = (data: any, key: string) => {
  const fileBlob = new Blob([data], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=utf-8",
  });
  const fileURL = URL.createObjectURL(fileBlob);
  const a = document.createElement("a");
  a.href = fileURL;
  a.download = `${key}.xlsx`;
  a.click();
};

export const downloadQRCodePNG = (data: any, key: string) => {
  const fileBlob = new Blob([data], {
    type: "image/png",
  });
  const fileURL = URL.createObjectURL(fileBlob);
  const a = document.createElement("a");
  a.href = fileURL;
  a.download = `${key}.png`;
  a.click();
};
