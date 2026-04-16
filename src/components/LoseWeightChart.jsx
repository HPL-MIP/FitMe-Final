import { motion } from "framer-motion";
import rawSvg from "../assets/img/LOSE_WEIGHT.svg?raw";

const defsMatch = rawSvg.match(/<defs>[\s\S]*<\/defs>/);
const defsHtml = defsMatch ? defsMatch[0] : "";
const defsInner = defsHtml.replace(/^<defs>/, "").replace(/<\/defs>$/, "");

const LoseWeightChart = ({ style, className }) => (
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
    <g clipPath="url(#clip0_1056_109)">
      <mask
        id="mask0_1056_109"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="29"
        y="24"
        width="929"
        height="714"
      >
        <path d="M957.82 24.9102H29.8203V737.91H957.82V24.9102Z" fill="black" />
      </mask>
      <g mask="url(#mask0_1056_109)">
        <path
          d="M2295.14 -794.313V1581.97H-1251.63V-794.313H2295.14Z"
          fill="white"
        />

        {/* Title — fade in from top */}
        <motion.rect
          x="40.002"
          y="41.6445"
          width="267.636"
          height="45.1082"
          fill="url(#pattern6_1056_109)"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        />

        {/* Small callout near title — appears when the line draw reaches it */}
        <motion.rect
          x="182.547"
          y="114.398"
          width="168.729"
          height="77.1211"
          fill="url(#pattern13_1056_109)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            transformOrigin: "266.91px 152.96px",
            transformBox: "fill-box",
          }}
          transition={{
            delay: 1.3,
            type: "spring",
            stiffness: 260,
            damping: 10,
            mass: 0.8,
          }}
        />

        {/* Left vertical axis line — draws top to bottom */}
        <motion.rect
          x="109.82"
          y="155.869"
          width="5.81818"
          height="462.722"
          fill="url(#pattern2_1056_109)"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          style={{
            transformOrigin: "112.73px 155.869px",
            transformBox: "fill-box",
          }}
          transition={{ duration: 1.4, delay: 0.5, ease: "easeInOut" }}
        />

        {/* Left icon — pops in when the line draw reaches it (start of the line) */}
        <motion.rect
          x="62.5474"
          y="102.758"
          width="100.364"
          height="100.402"
          fill="url(#pattern4_1056_109)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            transformOrigin: "112.73px 152.96px",
            transformBox: "fill-box",
          }}
          transition={{
            delay: 1.0,
            type: "spring",
            stiffness: 260,
            damping: 10,
            mass: 0.8,
          }}
        />

        {/* Main chart line (wipe left to right) */}
        <motion.rect
          x="28.3657"
          y="123.13"
          width="928"
          height="365.231"
          fill="url(#pattern1_1056_109)"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.8, delay: 1.0, ease: "easeInOut" }}
        />

        {/* Chart area/background (wipe left to right) */}
        <motion.rect
          x="29.8203"
          y="148.594"
          width="928"
          height="477.273"
          fill="url(#pattern0_1056_109)"
          initial={{ clipPath: "inset(0 100% 0 0)" }}
          animate={{ clipPath: "inset(0 0% 0 0)" }}
          transition={{ duration: 1.8, delay: 1.0, ease: "easeInOut" }}
        />

        {/* End icon — appears instantly when the line draw reaches it */}
        <motion.rect
          x="561.457"
          y="380.683"
          width="100.364"
          height="100.403"
          fill="url(#pattern5_1056_109)"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0, delay: 2.0 }}
        />

        {/* Tick mark near end of graph */}
        <motion.rect
          x="610.184"
          y="446.89"
          width="5.81818"
          height="165.882"
          fill="url(#pattern3_1056_109)"
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 1, scaleY: 1 }}
          style={{
            transformOrigin: "613.09px 446.89px",
            transformBox: "fill-box",
          }}
          transition={{ duration: 0.5, delay: 2.5 }}
        />

        {/* Big callout — bounces in after traveling icon arrives */}
        <motion.rect
          x="438.547"
          y="270.822"
          width="346.182"
          height="87.3061"
          fill="url(#pattern14_1056_109)"
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          style={{
            transformOrigin: "611.64px 314.48px",
            transformBox: "fill-box",
          }}
          transition={{
            delay: 2.0,
            type: "spring",
            stiffness: 260,
            damping: 10,
            mass: 0.8,
          }}
        />

        {/* Secondary label below big callout */}
        <motion.rect
          x="630.547"
          y="524.011"
          width="302.545"
          height="29.102"
          fill="url(#pattern12_1056_109)"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 3.1 }}
        />

        {/* X-axis labels — visible from the start */}
        <rect
          x="63.2744"
          y="657.88"
          width="116.364"
          height="29.102"
          fill="url(#pattern11_1056_109)"
        />
        <rect
          x="226.184"
          y="657.88"
          width="122.182"
          height="29.102"
          fill="url(#pattern10_1056_109)"
        />
        <rect
          x="392.002"
          y="657.88"
          width="122.182"
          height="29.102"
          fill="url(#pattern9_1056_109)"
        />
        {/* Highlighted label — enlarges after the line draw completes */}
        <motion.rect
          x="557.093"
          y="657.88"
          width="123.636"
          height="29.102"
          fill="url(#pattern8_1056_109)"
          initial={{ scale: 1 }}
          animate={{ scale: [1, 1.35, 1.2] }}
          style={{
            transformOrigin: "618.91px 672.43px",
            transformBox: "fill-box",
          }}
          transition={{ duration: 0.7, delay: 2.9, times: [0, 0.6, 1] }}
        />
        <rect
          x="723.638"
          y="657.88"
          width="122.182"
          height="29.102"
          fill="url(#pattern7_1056_109)"
        />
      </g>
    </g>
  </svg>
);

export default LoseWeightChart;
