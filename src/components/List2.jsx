import { motion, AnimatePresence } from "framer-motion";

import checkIcon from "../assets/img/CHECK.webp";

const List2 = ({
  stage,
  choices,
  modelImage,
  handleSelect,
  selectedId,
  selectedIds,
  isMultiple,
  className = {},
}) => {
  const textFirst = stage === 7;
  return (
    <div className={`flex w-full ${className.wrapper || ""}`}>
      <div
        className={`btnContainer flex flex-col  items-center ${
          modelImage ? "w-[50%]" : "w-full mt-20"
        } ${className.btnContainer || "gap-20"}`}
      >
        {choices.map((choice, index) => {
          const active = isMultiple
            ? selectedIds.includes(choice.id)
            : selectedId === choice.id;

          return (
            <motion.button
              key={`${choice.id}-${selectedId}`} // 👈 re-animate when selection changes
              onClick={() => handleSelect(choice.id)}
              className={`btn w-11/12 flex justify-between items-center cursor-pointer overflow-hidden ${
                active ? "border-10 border-[#4DB8C4] bg-[#DAE7EE]" : "bg-white"
              } ${className.btn || "h-[280px] pl-[50px]"}`}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{
                type: "spring",
                stiffness: 120,
                damping: 14,
                delay: index * 0.08, // 👈 stagger per item
              }}
            >
              <div
                className={`flex items-center w-full gap-4 text-left ${
                  className.textContainer || ""
                }`}
              >
                {textFirst ? (
                  <>
                    <p>{choice.text}</p>

                    {choice.img && (
                      <div>
                        <img
                          src={choice.img}
                          alt=""
                          className="w-full relative z-0"
                        />
                      </div>
                    )}
                  </>
                ) : (
                  <>
                    {choice.img && (
                      <div>
                        <img
                          src={choice.img}
                          alt=""
                          className="w-full relative z-0"
                        />
                      </div>
                    )}

                    <p>{choice.text}</p>
                  </>
                )}
              </div>

              {isMultiple && (
                <div className="w-15 h-15 flex items-center justify-center mr-8">
                  {active ? (
                    <img
                      src={checkIcon}
                      alt=""
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className="w-15 h-15 rounded-full border-3 border-gray-400" />
                  )}
                </div>
              )}
            </motion.button>
          );
        })}
      </div>

      {modelImage && (
        <div className="quizModelContainer w-[50%]">
          <img src={modelImage} alt="" className="w-full" />
        </div>
      )}
    </div>
  );
};

export default List2;
