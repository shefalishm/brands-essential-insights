import { ImageResponse } from "next/og";
export const alt = "Brands Essential Insights";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export default function Image() { return new ImageResponse(<div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", background: "#121f36", color: "#f4f4f4", padding: 72, fontFamily: "Arial" }}><div style={{ display: "flex", fontSize: 28 }}>BRANDS ESSENTIAL / INSIGHTS</div><div style={{ display: "flex", fontSize: 78, lineHeight: 1.02, maxWidth: 920 }}>Clarity for the new age of marketing.</div><div style={{ display: "flex", alignItems: "center", gap: 18, fontSize: 22 }}><div style={{ width: 18, height: 18, borderRadius: 99, background: "#ffd980" }} />Brand · AI · Content · Growth</div></div>, size); }
