import React, { useEffect, useMemo, useState } from "react";
import { ScrollControls } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Noise } from "@react-three/postprocessing";
import { Experience } from "./components/Experience";
import { Overlay } from "./components/Overlay";
import { usePlay } from "./contexts/Play";

function App() {
  const { play, end } = usePlay();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://rahul-05.github.io/JWST_React_Three_Fiber/db.json"
        );
        const data = await response.json();
        console.table(data.jwst);
        setData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const effects = useMemo(
    () => (
      <EffectComposer>
        <Noise opacity={0.1} />
      </EffectComposer>
    ),
    []
  );

  if (data && data.jwst && data.jwst.length > 0) {
    // Check if data and data.jwst are defined before accessing them
   

    return (
      <>
        <Canvas>
          <color attach="background" args={["#ececec"]} />
          <ScrollControls
            pages={play && !end ? 20 : 0}
            damping={0.5}
            style={{
              top: "10px",
              left: "0px",
              bottom: "10px",
              right: "10px",
              width: "auto",
              height: "auto",
              animation: "fadeIn 2.4s ease-in-out 1.2s forwards",
              opacity: 0,
            }}
          >
            <Experience data={data} loading={loading} />
          </ScrollControls>
          {effects}
        </Canvas>
        <Overlay />
      </>
    );
  }
}

export default App;
