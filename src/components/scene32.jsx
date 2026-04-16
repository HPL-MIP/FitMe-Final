import { useEffect, useMemo } from "react";
import riskIcon from "../assets/img/risk.webp";
import goodIcon from "../assets/img/good.webp";
import cardioIcon from "../assets/img/cardio_moderate.webp";
import beginnerIcon from "../assets/img/beginner.webp";
import moderateIcon from "../assets/img/moderate.webp";
import normalImg from "../assets/img/normal.webp";
import overweightImg from "../assets/img/overweight.webp";
import normalFemaleImg from "../assets/img/normal-female.webp";
import overweightFemaleImg from "../assets/img/overweight-female.webp";
import { motion } from "framer-motion";

const STAGE = 25;
const TOTAL_STAGES = 25;

const getBmiCategory = (bmi) => {
  if (bmi < 18.5) return "UNDERWEIGHT";
  if (bmi < 25) return "NORMAL";
  if (bmi < 30) return "OVERWEIGHT";
  return "OBESE";
};

const getInfoCard = (category, gender) => {
  const isFemale = gender === "female";
  const genderLabel = isFemale ? "women" : "men";
  const bodyFatRange = isFemale ? "25-31%" : "18-24%";
  switch (category) {
    case "UNDERWEIGHT":
      return {
        icon: goodIcon,
        bg: "#E8F5E9",
        title: "Risks for an unhealthy BMI",
        text: "High blood pressure, heart disease,stroke, type 2 diabetes, some types of cancer, osteoarthritis, back pain, all case mortality",
      };
    case "NORMAL":
      return {
        icon: goodIcon,
        bg: "#E2F1D7",
        title: "Good starting BMI to get a fit body",
        text: `Based on research, ${bodyFatRange} is an ideal body fat percentage for ${genderLabel} to start building muscle and get fit faster.`,
      };
    case "OVERWEIGHT":
    case "OBESE":
    default:
      return {
        icon: riskIcon,
        bg: "#FFF3E0",
        title: "Risks for an unhealthy BMI",
        text: "High blood pressure, heart disease, stroke, type 2 diabetes, some types of cancer, osteoarthritis, back pain, all case mortality",
      };
  }
};

// Maps BMI to dot position using evenly-spaced tick labels (15, 18.5, 25, 30, 40 at 0/25/50/75/100%)
const getDotPosition = (bmi) => {
  const ticks = [15, 18.5, 25, 30, 40];
  const clamped = Math.max(15, Math.min(40, bmi));
  for (let i = 0; i < ticks.length - 1; i++) {
    if (clamped >= ticks[i] && clamped <= ticks[i + 1]) {
      const ratio = (clamped - ticks[i]) / (ticks[i + 1] - ticks[i]);
      return (i + ratio) * 25;
    }
  }
  return 100;
};

const Scene32 = ({ heightCm, weightLbs, gender, onNext }) => {
  const height = heightCm || 170;
  const lbs = weightLbs || 154;
  const weightKg = lbs * 0.45359237;
  const hm = height / 100;
  const bmi = useMemo(() => (weightKg / (hm * hm)).toFixed(1), [weightKg, hm]);
  const bmiNum = parseFloat(bmi);
  const category = getBmiCategory(bmiNum);
  const info = getInfoCard(category, gender);
  const dotPos = getDotPosition(bmiNum);
  const isOverweight = category === "OVERWEIGHT" || category === "OBESE";
  const isFemale = gender === "female";
  const personImg = isOverweight
    ? isFemale
      ? overweightFemaleImg
      : overweightImg
    : isFemale
      ? normalFemaleImg
      : normalImg;

    return (
        <motion.div className="h-full flex flex-col justify-between" style={{ fontFamily: "'Open Sans', sans-serif", backgroundColor: "#EAF4F6" }}
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
            <div className="px-[20px] pt-[60px] pb-[40px]">
                <h1 className="font-bold text-center text-[#1f2933] mt-0 mb-[60px]" style={{ fontSize: "76px", lineHeight: "92px" }}>
                    Your Fitness profile
                </h1>

                <div className="w-full rounded-[50px] p-[60px]" style={{ backgroundColor: "#FFFFFF", boxShadow: "0px 6px 20px 0px #0000000D" }}>
                    {/* BMI Header Badge */}
                    <div className="flex justify-between items-center mb-[100px]">
                        <p className="mt-0 mb-0 font-bold text-[#1f2933]" style={{ fontSize: "48px" }}>Body mass index (BMI)</p>
                        <div className="px-[25px] rounded-[23px]" style={{ backgroundColor: "#F0F2F5", fontWeight: 400, fontSize: "32.26px", lineHeight: "62.05px", color: "#131D30" }}>
                            {category} - {bmi}
                        </div>
                    </div>

          {/* BMI SCALE COMPONENT */}
          <div className="relative mb-[80px] w-full px-[10px]">
            {/* 1. Tooltip & Connector Line */}
            <motion.div
              className="absolute"
              style={{ bottom: "150px", zIndex: 1 }}
              initial={{ left: "0%", opacity: 0, x: "-47%" }}
              animate={{ left: `${dotPos}%`, opacity: 1, x: "-47%" }}
              transition={{
                type: "spring",
                stiffness: 80,
                damping: 16,
                delay: 0.4,
              }}
            >
              <div
                className="relative flex items-center justify-center rounded-[64px]"
                style={{
                  backgroundColor: "#131D30",
                  color: "#FFFFFF",
                  fontSize: "36px",
                  fontWeight: 700,
                  padding: "15px 40px",
                  marginBottom: "55px",
                  whiteSpace: "nowrap",
                }}
              >
                You-{bmi}
                <div
                  className="absolute"
                  style={{
                    bottom: "-12px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    width: "0",
                    height: "0",
                    borderLeft: "12px solid transparent",
                    borderRight: "12px solid transparent",
                    borderTop: "15px solid #131D30",
                  }}
                />
              </div>
              <div
                className="absolute"
                style={{
                  left: "50%",
                  transform: "translateX(-55%)",
                  bottom: "-15px",
                  width: "4px",
                  height: "80px",
                  backgroundColor: "#A0AAB5",
                  zIndex: -10,
                }}
              />
            </motion.div>

            {/* 2. Numeric Labels & Vertical Lines */}
            <div className="flex justify-between mb-[25px] relative">
              {["15", "18.5", "25", "30", "40"].map((v) => (
                <div key={v} className="flex flex-col items-center">
                  <span
                    style={{
                      fontSize: "32px",
                      color: "#A0AAB5",
                      fontWeight: 700,
                    }}
                  >
                    {v}
                  </span>
                  <div
                    style={{
                      width: "3px",
                      height: "100px",
                      backgroundColor: "#E9E9E9",
                      position: "absolute",
                      top: "45px",
                      zIndex: 1,
                    }}
                  />
                </div>
              ))}
            </div>

            {/* 3. The Bar & Circle Selector */}
            <div className="relative w-full h-[26px] rounded-full flex z-2">
              <div
                style={{
                  flex: "1",
                  background: "linear-gradient(90deg, #60B5E8, #7BC8A4)",
                  borderTopLeftRadius: "9999px",
                  borderBottomLeftRadius: "9999px",
                }}
              />
              <div
                style={{
                  flex: "1",
                  background: "linear-gradient(90deg, #7BC8A4, #B8D86B)",
                }}
              />
              <div
                style={{
                  flex: "1",
                  background: "linear-gradient(90deg, #E8D44D, #F5A623)",
                }}
              />
              <div
                style={{
                  flex: "1",
                  background: "linear-gradient(90deg, #F5A623, #E84D4D)",
                  borderTopRightRadius: "9999px",
                  borderBottomRightRadius: "9999px",
                }}
              />

              <motion.div
                className="absolute flex items-center justify-center rounded-full"
                style={{
                  top: "50%",
                  width: "78.28px",
                  height: "78.28px",
                  backgroundColor: "#FFFFFF",
                  boxShadow: "0px 4px 34px 0px #0000002B",
                  zIndex: 5,
                }}
                initial={{ left: "0%", x: "-50%", y: "-50%" }}
                animate={{ left: `${dotPos}%`, x: "-50%", y: "-50%" }}
                transition={{
                  type: "spring",
                  stiffness: 80,
                  damping: 16,
                  delay: 0.4,
                }}
              >
                <div
                  style={{
                    width: "29.46px",
                    height: "29.46px",
                    backgroundColor: "#131D30",
                    borderRadius: "50%",
                  }}
                />
              </motion.div>
            </div>

                        {/* 4. Category Labels */}
                        <div className="relative mt-[55px]" style={{ height: "40px" }}>
                            {[
                                { label: "UNDERWEIGHT", pos: 0, anchor: "left" },
                                { label: "NORMAL", pos: 40.5, anchor: "center" },
                                { label: "OVERWEIGHT", pos: 69.5, anchor: "center" },
                                { label: "OBESE", pos: 100, anchor: "right" },
                            ].map(({ label, pos, anchor }) => {
                                const tx = anchor === "left" ? "0" : anchor === "right" ? "-100%" : "-50%";
                                return (
                                    <span key={label} className="absolute" style={{ left: `${pos}%`, transform: `translateX(${tx})`, fontSize: "29px", color: label === category ? "#131D30" : "#A0AAB5", fontWeight: label === category ? 500 : 700, whiteSpace: "nowrap" }}>
                                        {label}
                                    </span>
                                );
                            })}
                        </div>
                    </div>

          {/* Stats & Image Row */}
          <div className="flex items-start gap-[30px] mb-[60px]">
            <div className="flex flex-col gap-[40px] shrink-0 z-19">
              {[
                {
                  icon: cardioIcon,
                  label: "Cardiovascular endurance",
                  value: "Moderate",
                },
                {
                  icon: beginnerIcon,
                  label: "Fitness level",
                  value: "Beginner",
                },
                {
                  icon: moderateIcon,
                  label: "Health risks",
                  value: "Moderate",
                },
              ].map((stat, i) => (
                <div key={i} className="flex items-center gap-[28px]">
                  <img
                    src={stat.icon}
                    alt={stat.label}
                    style={{
                      width: "100px",
                      height: "auto",
                      objectFit: "contain",
                    }}
                  />
                  <div>
                    <p
                      className="mt-0 mb-0"
                      style={{ fontSize: "38px", color: "#6b7a8d" }}
                    >
                      {stat.label}
                    </p>
                    <p
                      className="mt-0 mb-0 font-bold"
                      style={{ fontSize: "44px", color: "#1f2933" }}
                    >
                      {stat.value}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <img
              src={personImg}
              alt="Body type"
              style={{
                position: "absolute",
                width: "388.22px",
                height: "448.61px",
                top: "756.29px",
                left: "623.93px",
                opacity: 1,
                objectFit: "contain",
              }}
            />
          </div>

          {/* Bottom Info Card */}
          <div
            className="w-full rounded-[40px] p-[45px] flex items-start gap-[30px]"
            style={{ backgroundColor: info.bg }}
          >
            <img
              src={info.icon}
              alt="info"
              style={{ width: "75px", height: "75px", marginTop: "8px" }}
            />
            <div>
              <p
                className="font-bold text-[#1f2933] mt-0 mb-[12px]"
                style={{ fontSize: "44px", lineHeight: "56px" }}
              >
                {info.title}
              </p>
              <p
                className="text-[#4a5568] mt-0 mb-0"
                style={{ fontSize: "40px", lineHeight: "54px" }}
              >
                {info.text}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="shrink-0 px-[50px] pb-[30vh] landscape:pb-[6vh] landscape:mt-[4vh]">
        <button
          onClick={() => onNext?.()}
          className="animate-pulsing w-full py-[50px] rounded-full border-none font-bold text-white cursor-pointer active:scale-95 transition-transform landscape:mb-[60vh]"
          style={{ fontSize: "52px", backgroundColor: "#4DB8C4" }}
        >
          Continue
        </button>
      </div>
    </motion.div>
  );
};

export default Scene32;
