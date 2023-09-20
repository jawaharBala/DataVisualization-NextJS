import ReactDOMServer from "react-dom/server";
export const encodeSvg = (reactElement: any) =>
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(ReactDOMServer.renderToStaticMarkup(reactElement));
export const MarkerIcon = (color:string) => {
  return (
    <svg
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
    >
      <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 0 1 0-5 2.5 2.5 0 0 1 0 5z" />
    </svg>
  );
};
