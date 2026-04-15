import useScaleUI from "./hooks/useScaleUI";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Intro from "./components/Intro";
import Taichi from "./components/Taichi";
import Quiz from "./components/Quiz";
import RegularWorkout from "./components/RegularWorkout";
import GraphWorkout from "./components/GraphWorkout";
import MeditationWorkout from "./components/MeditationWorkout";
import Terms from "./components/termsConditions/Terms";
import Policy from "./components/termsConditions/Policy";

import Scene16 from "./components/scene16";
import Scene17 from "./components/scene17";
import Scene18 from "./components/scene18";
import Scene19 from "./components/scene19";
import Scene20 from "./components/scene20";
import Scene21 from "./components/scene21";
import Scene22 from "./components/scene22";
import Scene23 from "./components/scene23";
import Scene24 from "./components/scene24";
import Scene25 from "./components/scene25";
import Scene26 from "./components/scene26";
import Scene27 from "./components/scene27";
import Scene28 from "./components/scene28";
import Scene29 from "./components/scene29";
import Scene30 from "./components/scene30";
import Scene31 from "./components/scene31";
import Scene32 from "./components/scene32";
import Scene33 from "./components/scene33";
import Scene34 from "./components/scene34";
import Scene35 from "./components/scene35";
import Scene36 from "./components/scene36";
import EndScene from "./components/EndScene";

import logo from "./assets/img/logo.png";
import logo2 from "./assets/img/logo2.png";
import backarrow from "./assets/img/backarrow.png";

import srcPortrait from "./assets/video/portrait.mp4";
import srcLandscape from "./assets/video/landscape.mp4";

import clickSfx from "./assets/Sfx/click2.wav";

import { quiz } from "./data/data";

const SCENE_SCREENS = [
  "scene16",
  "scene17",
  "scene18",
  "scene19",
  "scene20",
  "scene21",
  "scene22",
  "scene23",
  "scene24",
  "scene25",
  "scene26",
  "scene27",
  "scene28",
  "scene29",
  "scene30",
  "scene31",
  "scene32",
  "scene33",
  "scene34",
  "scene35",
  "scene36",
];

const App = () => {
  const { appRef, wrapperRef } = useScaleUI(1080, 2340);

  const [screen, setScreen] = useState("intro");
  const [stage, setStage] = useState(0);
  const [gender, setGender] = useState("male");
  const [answers, setAnswers] = useState({});

  const [heightCm, setHeightCm] = useState(null);
  const [weightLbs, setWeightLbs] = useState(null);
  const [weightUnit, setWeightUnit] = useState("lbs");
  const [userName, setUserName] = useState("");
  const [scene20Index, setScene20Index] = useState(0);
  const [goal, setGoal] = useState("lose_weight");

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState("");

  const [taichiAgeGroup, setTaichiAgeGroup] = useState(null);
  const [taichiAgeLabel, setTaichiAgeLabel] = useState("");

  const totalStages = quiz.length;

  useEffect(() => {
    setStage(0);
    setAnswers({});
  }, [gender]);

  useEffect(() => {
    const audio = new Audio(clickSfx);
    audio.preload = "auto";
    audio.load();
    const handler = (e) => {
      if (e.target.closest("button")) {
        try {
          audio.currentTime = 0;
          audio.play().catch(() => {});
        } catch {}
      }
    };
    document.addEventListener("pointerdown", handler);
    return () => document.removeEventListener("pointerdown", handler);
  }, []);

  const handleGenderSelect = (value) => {
    const clean = String(value).toLowerCase().trim();
    setGender(clean === "female" ? "female" : "male");
    setScreen("taichi");
  };

  const handleTaichiSelect = (id) => {
    const ageData = getAgeFromTaichi(id);

    setTaichiAgeGroup(ageData.value);
    setTaichiAgeLabel(ageData.label);

    setScreen("quiz");
    setStage(0);
  };

  const isSceneScreen = SCENE_SCREENS.includes(screen);
  const isWorkoutScreen =
    screen === "workout" ||
    screen === "graphWorkout" ||
    screen === "meditationWorkout";
  const noBackScenes = ["scene33", "scene34", "scene35", "scene36"];
  const showBack =
    (screen === "quiz" || isWorkoutScreen || isSceneScreen) &&
    !noBackScenes.includes(screen);
  const useLogo2 = screen === "quiz" || isWorkoutScreen || isSceneScreen;

  const SCENE_PROGRESS_MAX = 31;
  const SCENE_PROGRESS_START = 16;
  const sceneProgressScreens = SCENE_SCREENS.filter(
    (s) =>
      s !== "scene26" &&
      s !== "scene30" &&
      s !== "scene31" &&
      s !== "scene32" &&
      s !== "scene34" &&
      s !== "scene35" &&
      s !== "scene36",
  );
  const isSceneProgressScreen = sceneProgressScreens.includes(screen);
  const showProgressBar = screen === "quiz" || isSceneProgressScreen;
  const showStageCounter = showProgressBar;

  const scene20Idx = sceneProgressScreens.indexOf("scene20");
  const currentSceneIdx = sceneProgressScreens.indexOf(screen);
  const scene20Bonus =
    screen === "scene20" ? scene20Index : currentSceneIdx > scene20Idx ? 3 : 0;
  const counterCurrent = isSceneProgressScreen
    ? SCENE_PROGRESS_START + currentSceneIdx + scene20Bonus
    : stage + 1;
  const counterTotal = SCENE_PROGRESS_MAX;

  const progressPercent = (counterCurrent / SCENE_PROGRESS_MAX) * 100;

  const handleBack = () => {
    if (screen === "quiz") {
      if (stage > 0) setStage((prev) => prev - 1);
      else setScreen("taichi");
      return;
    }

    if (isWorkoutScreen) {
      setScreen("quiz");
      return;
    }

    if (isSceneScreen) {
      const idx = SCENE_SCREENS.indexOf(screen);
      if (idx > 0) {
        setScreen(SCENE_SCREENS[idx - 1]);
      } else {
        setScreen("quiz");
        setStage(quiz.length - 1);
      }
    }
  };

  const isEndcard = screen === "endcard";

  if (isEndcard) {
    return (
      <div
        style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "#EDF3F6",
        }}
      >
        <EndScene srcPortrait={srcPortrait} srcLandscape={srcLandscape} />
      </div>
    );
  }

  const getAgeFromTaichi = (id) => {
    switch (id) {
      case 1:
        return { value: 30, label: "30" };
      case 2:
        return { value: 40, label: "40" };
      case 3:
        return { value: 50, label: "50" };
      case 4:
        return { value: 60, label: "60" };
      default:
        return { value: 40, label: "40" };
    }
  };

  return (
    <>
      {/* HEADER */}
      <div className="flex items-center w-full h-[11vmin] bg-white drop-shadow px-[3vmin]">
        <div className="w-1/3 flex justify-start">
          {showBack && (
            <button className="arrowBtn w-[7vmin]" onClick={handleBack}>
              <img src={backarrow} className="w-full" />
            </button>
          )}
        </div>

        <motion.div
          className="w-1/3 flex justify-center"
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 120, damping: 14 }}
        >
          <img src={useLogo2 ? logo2 : logo} className="logoImg" />
        </motion.div>

        <div className="w-1/3 flex justify-end">
          <p
            className="quizTxt text-[3vmin]"
            style={{ visibility: showStageCounter ? "visible" : "hidden" }}
          >
            <span style={{ color: "#4DB8C4" }}>{counterCurrent}</span> /{" "}
            {counterTotal}
          </p>
        </div>
      </div>

      {/* WRAPPER */}
      <div
        ref={wrapperRef}
        className="appWrapper bg-cover bg-no-repeat landscape:bg-center"
        style={{
          backgroundColor: screen === "intro" ? "#f6f4f1" : "#EAF4F6",
        }}
      >
        <div ref={appRef} className="app flex flex-col justify-center">
          {/* PROGRESS */}
          {showProgressBar && (
            <div
              className="progressBar w-full h-[30px] bg-gray-200 overflow-hidden rounded-full"
              style={
                isSceneProgressScreen
                  ? { position: "absolute", top: 0, left: 0, zIndex: 10 }
                  : undefined
              }
            >
              <div
                className="h-full bg-[#4DB8C4] rounded-full"
                style={{
                  width: `${progressPercent}%`,
                  transition: "width 0.3s ease",
                }}
              />
            </div>
          )}

          {screen === "intro" && (
            <Intro
              onSelectGender={handleGenderSelect}
              setShowModal={setShowModal}
              setModalType={setModalType}
            />
          )}

          {screen === "taichi" && (
            <Taichi
              onSelectAge={handleTaichiSelect}
              setShowModal={setShowModal}
              setModalType={setModalType}
            />
          )}

          {screen === "quiz" && (
            <Quiz
              stage={stage}
              setStage={setStage}
              gender={gender}
              setGender={setGender}
              setScreen={setScreen}
              answers={answers}
              setAnswers={setAnswers}
            />
          )}

          {screen === "workout" && (
            <RegularWorkout
              setScreen={setScreen}
              setStage={setStage}
              gender={gender}
              taichiAgeLabel={taichiAgeLabel}
            />
          )}

          {screen === "graphWorkout" && (
            <GraphWorkout
              setScreen={setScreen}
              setStage={setStage}
              gender={gender}
            />
          )}

          {screen === "meditationWorkout" && (
            <MeditationWorkout
              setScreen={setScreen}
              setStage={setStage}
              gender={gender}
            />
          )}

          {screen === "scene16" && (
            <Scene16
              onNext={(cm, heightUnit) => {
                setHeightCm(cm);
                setWeightUnit(heightUnit === "cm" ? "kg" : "lbs");
                setScreen("scene17");
              }}
            />
          )}
          {screen === "scene17" && (
            <Scene17
              heightCm={heightCm}
              unit={weightUnit}
              onNext={(lbs) => {
                setWeightLbs(lbs);
                setScreen("scene18");
              }}
            />
          )}
          {screen === "scene18" && (
            <Scene18
              heightCm={heightCm}
              weightLbs={weightLbs}
              unit={weightUnit}
              onNext={(goalLbs) => {
                if (goalLbs && weightLbs) {
                  setGoal(goalLbs > weightLbs ? "muscle_mass" : "lose_weight");
                }
                setScreen("scene19");
              }}
            />
          )}
          {screen === "scene19" && (
            <Scene19 onNext={() => setScreen("scene20")} />
          )}
          {screen === "scene20" && (
            <Scene20
              gender={gender}
              onIndexChange={setScene20Index}
              onNext={() => setScreen("scene21")}
            />
          )}
          {screen === "scene21" && (
            <Scene21 onNext={() => setScreen("scene22")} />
          )}
          {screen === "scene22" && (
            <Scene22 onNext={() => setScreen("scene23")} />
          )}
          {screen === "scene23" && (
            <Scene23 onNext={() => setScreen("scene24")} />
          )}
          {screen === "scene24" && (
            <Scene24 onNext={() => setScreen("scene25")} />
          )}
          {screen === "scene25" && (
            <Scene25 onNext={() => setScreen("scene26")} />
          )}
          {screen === "scene26" && (
            <Scene26 onNext={() => setScreen("scene27")} />
          )}
          {screen === "scene27" && (
            <Scene27 onNext={() => setScreen("scene28")} />
          )}
          {screen === "scene28" && (
            <Scene28 onNext={() => setScreen("scene29")} />
          )}
          {screen === "scene29" && (
            <Scene29 onNext={() => setScreen("scene30")} />
          )}
          {screen === "scene30" && (
            <Scene30 gender={gender} onNext={() => setScreen("scene31")} />
          )}
          {screen === "scene31" && (
            <Scene31 onNext={() => setScreen("scene32")} />
          )}
          {screen === "scene32" && (
            <Scene32
              heightCm={heightCm}
              weightLbs={weightLbs}
              gender={gender}
              onNext={() => setScreen("scene33")}
            />
          )}
          {screen === "scene33" && (
            <Scene33
              onNext={(name) => {
                setUserName(name);
                setScreen("scene34");
              }}
            />
          )}
          {screen === "scene34" && (
            <Scene34 onNext={() => setScreen("scene35")} />
          )}
          {screen === "scene35" && (
            <Scene35 onNext={() => setScreen("scene36")} />
          )}
          {screen === "scene36" && (
            <Scene36 userName={userName} goal={goal} onNext={() => setScreen("endcard")} />
          )}
        </div>
      </div>
      {showModal && (
        <div
          className="fixed top-0 left-0 w-screen h-screen bg-black/60 flex items-center justify-center z-[999999]"
          onClick={() => setShowModal(false)}
        >
          <div
            className="relative bg-white w-10/12 max-w-[85vw] h-[75vh] p-[2vmin] rounded-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* CLOSE */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-0 right-[3vmin] text-[6vmin] font-bold"
            >
              ×
            </button>

            <div className="text-[2vmin] max-h-[65vh] overflow-y-auto text-center mt-[6vmin]">
              {modalType === "terms" && <Terms />}
              {modalType === "privacy" && <Policy />}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default App;
