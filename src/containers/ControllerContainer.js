import React from "react";
import { Button } from "semantic-ui-react";
import IntervalSlider from "../components/IntervalSlider";
import ControllerButton from "../components/ControllerButton";

const ControllerContainer = ({
  intervalSpeed,
  setIntervalSpeed,
  changeMap,
  handleClick
}) => {
  const mapButtons = () => {
    return Object.keys(changeMap).map(label => (
      <ControllerButton label={label} handleClick={handleClick} />
    ));
  };
  return (
    <div>
      <Button fluid>ControllerContainer</Button>
      {mapButtons()}
      <IntervalSlider
        intervalSpeed={intervalSpeed}
        setIntervalSpeed={setIntervalSpeed}
      />
    </div>
  );
};

export default ControllerContainer;
