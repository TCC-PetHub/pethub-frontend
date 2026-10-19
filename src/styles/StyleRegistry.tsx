"use client";

import { useRef, useState, type ReactNode } from "react";
import {
  createStyleRegistry,
  StyleRegistry as StyledJsxRegistry,
} from "styled-jsx";
import { useServerInsertedHTML } from "next/navigation";
import { getCssText } from "@/styles";

// Envia o CSS coletado antes de cada trecho do HTML transmitido pelo servidor.
export default function StyleRegistry({ children }: { children: ReactNode }) {
  const previousCss = useRef("");
  const [jsxRegistry] = useState(() => createStyleRegistry());

  useServerInsertedHTML(() => {
    const css = getCssText();
    const jsxStyles = jsxRegistry.styles();
    jsxRegistry.flush();
    const cssChanged = css !== previousCss.current;
    previousCss.current = css;

    return (
      <>
        {cssChanged && (
          <style data-stitches-ssr dangerouslySetInnerHTML={{ __html: css }} />
        )}
        {jsxStyles}
      </>
    );
  });

  return (
    <StyledJsxRegistry registry={jsxRegistry}>{children}</StyledJsxRegistry>
  );
}
