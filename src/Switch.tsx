import React, { FunctionComponent, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useWindowWidth } from "./hooks";
import { isWindowSmall } from "./utilities";

type Props = {
  left: string;
  right: string;
  lock: boolean;
  onToggle: (answer: string) => void;
};

const Switch: FunctionComponent<Props> = ({ left, right, lock, onToggle }) => {
  const [toggleDirection, setToggleDirection] = useState(0);

  const windowWidth = useWindowWidth();
  const windowIsSmall = isWindowSmall(windowWidth);
  const animateDistance = windowIsSmall ? 125 : 200;

  const toggleOn = () => {
    if (!lock) {
      onToggle(toggleDirection === 0 ? right : left);
      setToggleDirection(toggleDirection === 0 ? animateDistance : 0);
    }
  };

  useEffect(() => {
    if (!windowIsSmall && toggleDirection > 0) {
      setToggleDirection(200);
    }

    if (windowIsSmall && toggleDirection > 0) {
      setToggleDirection(125);
    }
  }, [windowWidth]);

  const backgroundClass = windowIsSmall
    ? "smallSwitchBackground"
    : "switchBackground";
  const circleClass = windowIsSmall ? "smallSwitchCircle" : "switchCircle";

  return (
    <motion.div onTap={toggleOn} className={backgroundClass}>
      <div className="switchText">
        <span>{left}</span>
        <span>{right}</span>
      </div>
      <motion.div
        onTap={toggleOn}
        animate={{
          x: toggleDirection
        }}
        transition={{
          stiffness: 700,
          damping: 30
        }}
        className={circleClass}
      />
    </motion.div>
  );
};

export default Switch;
