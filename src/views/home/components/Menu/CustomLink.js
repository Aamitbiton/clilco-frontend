import React from "react";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { turquoise } from "../../../../themes";
function CustomLink({ children, to, style, ...props }) {
  const resolved = useResolvedPath(to);
  const match = useMatch({ path: resolved.pathname, end: true });
  return (
    <Link
      style={{
        color: match ? turquoise : "white",
        textDecoration: "none",
      }}
      to={to}
      {...props}
    >
      {children}
    </Link>
  );
}

export default CustomLink;
