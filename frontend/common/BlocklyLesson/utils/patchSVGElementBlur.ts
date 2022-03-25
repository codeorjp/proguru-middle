export default function patchSVGElementBlur() {
  const svgElement = document.getElementsByClassName(
    "blocklySvg"
  )[0] as SVGElement;
  if (svgElement.blur === undefined) {
    svgElement.blur = () => {};
  }
}
