import React, { useState, useEffect, useRef } from "react";
import { Container, Grid, Header } from "semantic-ui-react";
import MenuContainer from "../containers/MenuContainer";
import AlgorithmsContainer from "../containers/AlgorithmsContainer";
import md5 from "md5"; // This library let's us generate a hashed key for algos

import { generateSteps } from "../util/algorithmHelper";

const App = () => {
  const [algos, setAlgos] = useState([]);

  const [intervalSpeed, setIntervalSpeed] = useState(500);

  const menuSelect = algoName => {
    if (algos.length >= 8)
      return alert("You can only selected 8 algorithms at a time.");

    const algo = {
      name: algoName,
      key: md5(Date.now()),
      steps: generateSteps(algoName),
      currentStep: 0
    };

    const updatedAlgos = [...algos, algo];
    setAlgos(updatedAlgos);
  };

  const incrementStep = () => {
    // currentStep for each algo should either increment or remain at final step
    let updateAlgos = [...algos];
    updateAlgos.map(algo => {
      algo.currentStep += 1;
      if (algo.currentStep >= algo.steps.length)
        algo.currentStep = algo.steps.length - 1;
    });
    setAlgos(updateAlgos);
  };

  const removeAlgo = algoKey => {
    const updatedAlgos = algos.filter(algo => algo.key !== algoKey);
    setAlgos(updatedAlgos);
  };

  const useInterval = (callback, delay) => {
    const savedCallback = useRef();

    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);

    useEffect(() => {
      const stepTick = () => {
        savedCallback.current();
      };
      if (delay !== null) {
        let id = setInterval(stepTick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  };

  useInterval(() => {
    incrementStep();
  }, intervalSpeed);

  return (
    <div className="App">
      <Container text textAlign="center">
        <Header size="huge">Algo</Header>
      </Container>
      <Container fluid>
        <Grid columns={2} stackable>
          <Grid.Column width={3}>
            <MenuContainer menuSelect={menuSelect} />
          </Grid.Column>
          <Grid.Column width={12}>
            <AlgorithmsContainer
              algos={algos}
              removeAlgo={removeAlgo}
              intervalSpeed={intervalSpeed}
              setIntervalSpeed={setIntervalSpeed}
            />
          </Grid.Column>
        </Grid>
      </Container>
    </div>
  );
};

export default App;
