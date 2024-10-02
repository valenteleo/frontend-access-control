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
