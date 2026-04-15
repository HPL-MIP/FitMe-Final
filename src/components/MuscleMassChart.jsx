import { motion } from "framer-motion";
import rawSvg from "../assets/img/MUSCLE_MASS.svg?raw";

// Extract <defs>...</defs> once at module load
const defsMatch = rawSvg.match(/<defs>[\s\S]*<\/defs>/);
const defsHtml = defsMatch ? defsMatch[0] : "";
// Strip the outer <defs> tags so we can re-wrap them in JSX
const defsInner = defsHtml.replace(/^<defs>/, "").replace(/<\/defs>$/, "");

const MuscleMassChart = ({ style, className }) => (
  <svg
    width="988"
    height="763"
    viewBox="0 0 988 763"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    style={style}
    className={className}
  >
    <defs dangerouslySetInnerHTML={{ __html: defsInner }} />
    <rect
      x="1.5"
      y="1.5"
      width="984.641"
      height="759.818"
      rx="45.5"
      fill="white"
      stroke="#E9E9E9"
      strokeWidth="3"
    />
    <g clipPath="url(#clip0_1053_29)">
      <path
        d="M2295.14 -792.445V1580.06H-1251.63V-792.445H2295.14Z"
        fill="white"
      />

      {/* Title — fade in from top */}
      <motion.rect
        x="40.0034"
        y="75.9609"
        width="388.364"
        height="34.867"
        fill="url(#pattern6_1053_29)"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      />

      {/* Top-right callout badge — bounces in after right icon arrives */}
      <motion.rect
        x="588.367"
        y="99.5693"
        width="346.182"
        height="87.1674"
        fill="url(#pattern12_1053_29)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: "761px 143px", transformBox: "fill-box" }}
        transition={{
          delay: 2.9,
          type: "spring",
          stiffness: 260,
          damping: 10,
          mass: 0.8,
        }}
      />

      {/* Y-axis start label (left side) — bounce in */}
      <motion.rect
        x="72.0029"
        y="353.08"
        width="157.092"
        height="85.7154"
        fill="url(#pattern11_1053_29)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: "150.55px 395.94px", transformBox: "fill-box" }}
        transition={{
          delay: 0.5,
          type: "spring",
          stiffness: 260,
          damping: 10,
          mass: 0.8,
        }}
      />

      {/* Left icon — pops in when the line draw starts */}
      <motion.rect
        x="97.458"
        y="459.135"
        width="100.364"
        height="100.243"
        fill="url(#pattern4_1053_29)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: "147.64px 509.26px", transformBox: "fill-box" }}
        transition={{ duration: 0.4, delay: 1.0, type: "spring" }}
      />

      {/* Small tick mark */}
      <motion.rect
        x="144.73"
        y="521.604"
        width="5.81818"
        height="97.3369"
        fill="url(#pattern3_1053_29)"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        style={{ transformOrigin: "147.64px 521.604px", transformBox: "fill-box" }}
        transition={{ duration: 0.4, delay: 0.9 }}
      />

      {/* Main chart plot (wipe left to right — this is the big chart line) */}
      <motion.rect
        x="28.3672"
        y="208.528"
        width="928"
        height="345.764"
        fill="url(#pattern1_1053_29)"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.8, delay: 1.0, ease: "easeInOut" }}
      />

      {/* Chart area/background (wipe left to right — slightly behind) */}
      <motion.rect
        x="31.2764"
        y="227.414"
        width="925.091"
        height="389.348"
        fill="url(#pattern0_1053_29)"
        initial={{ clipPath: "inset(0 100% 0 0)" }}
        animate={{ clipPath: "inset(0 0% 0 0)" }}
        transition={{ duration: 1.8, delay: 1.0, ease: "easeInOut" }}
      />

      {/* Right vertical axis line (draw top to bottom) */}
      <motion.rect
        x="758.549"
        y="260.103"
        width="5.81818"
        height="347.217"
        fill="url(#pattern2_1053_29)"
        initial={{ opacity: 0, scaleY: 0 }}
        animate={{ opacity: 1, scaleY: 1 }}
        style={{ transformOrigin: "761.46px 260.103px", transformBox: "fill-box" }}
        transition={{ duration: 1.4, delay: 2.5, ease: "easeInOut" }}
      />

      {/* Right icon — pops in when the line draw reaches its position */}
      <motion.rect
        x="711.276"
        y="212.16"
        width="100.364"
        height="100.243"
        fill="url(#pattern5_1053_29)"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ transformOrigin: "761.46px 262.28px", transformBox: "fill-box" }}
        transition={{ duration: 0.4, delay: 2.3, type: "spring" }}
      />

      {/* X-axis labels — visible from the start */}
      <rect
        x="95.2764"
        y="642.912"
        width="116.364"
        height="29.0558"
        fill="url(#pattern10_1053_29)"
      />
      <rect
        x="297.944"
        y="642.912"
        width="122.182"
        height="29.0558"
        fill="url(#pattern9_1053_29)"
      />
      <rect
        x="503.518"
        y="642.912"
        width="122.182"
        height="29.0558"
        fill="url(#pattern8_1053_29)"
      />
      {/* Highlighted label — enlarges after the line draw completes */}
      <motion.rect
        x="708.367"
        y="642.912"
        width="123.636"
        height="29.0558"
        fill="url(#pattern7_1053_29)"
        initial={{ scale: 1 }}
        animate={{ scale: [1, 1.35, 1.2] }}
        style={{
          transformOrigin: "770.19px 657.44px",
          transformBox: "fill-box",
        }}
        transition={{ duration: 0.7, delay: 2.9, times: [0, 0.6, 1] }}
      />
    </g>
  </svg>
);

export default MuscleMassChart;
