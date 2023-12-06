import { Float, OrbitControls, PerspectiveCamera, useScroll } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { gsap } from "gsap";
import { useEffect, useState, useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { Euler, Group, Vector3 } from "three";
import { usePlay } from "../contexts/Play";
import { fadeOnBeforeCompile } from "../utils/fadeMaterial";
// import { Airplane } from "./Airplane";
import { Paperplane } from "./Paperplane";
import { Background } from "./Background";
import { Cloud } from "./Cloud";
import { Astroid } from "./Astroid";
import { Speed } from "./Speed";
import { TextSection } from "./TextSection";


const LINE_NB_POINTS = 1000;
const CURVE_DISTANCE = 150;
const CURVE_AHEAD_CAMERA = 0.008;
const CURVE_AHEAD_AIRPLANE = 0.02;
const AIRPLANE_MAX_ANGLE = 35;
const FRICTION_DISTANCE = 42;


export const Experience = ({ data, loading }) => {
  // const { data, loading, error } = useApiData();
  const curvePoints = useMemo(
    () => [
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(0, 0, -1 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -2 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -3 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -4 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -5 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -6 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -7 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -8 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -9 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -10 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -11 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -12 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -13 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -14 * CURVE_DISTANCE),
      new THREE.Vector3(-100, 0, -15 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -16 * CURVE_DISTANCE),
      new THREE.Vector3(100, 0, -17 * CURVE_DISTANCE),
      new THREE.Vector3(0, 0, -18 * CURVE_DISTANCE),
    ],
    []
  );

  const sceneOpacity = useRef(0);
  const lineMaterialRef = useRef();

  const curve = useMemo(() => {
    return new THREE.CatmullRomCurve3(curvePoints, false, "catmullrom", 0.5);
  }, []);

  // const [loading, setLoading] = useState(true);
  // const [data, setData] = useState(null);

  // useEffect(() => {
  //   const fetchDataAndSetState = async () => {
  //     try {
  //       const fetchedData = await fetchData();
  //       setData(fetchedData);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchDataAndSetState();
  // }, []);

  // const [data, setData] = useState(null);
  // const [loading, setLoading] = useState(true);

  // const fetchData = async () => {
  //   try {
  //     const response = await fetch(
  //       "https://rahul-05.github.io/JWST_React_Three_Fiber/db.json"
  //     );
  //     const data = await response.json();
  //     console.table(data.jwst);
  //     setData(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //   }
  //   finally {
  //     setLoading(false); // Set loading to false whether the request was successful or not
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  const textSections = useMemo(() => {
    if (loading || !data || !data.jwst || data.jwst.length === 0) {
      // Data is still loading, or it's empty, return an empty array
      return [];
    }
    return [
      {
        cameraRailDist: -3,
        position: new Vector3(
          curvePoints[1].x - 5,
          curvePoints[1].y,
          curvePoints[1].z
        ),
        imageUrl: data.jwst[0].imageUrl,
        title: data.jwst[0].title,
        subtitle: data.jwst[0].subtitle,
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[2].x + 2,
          curvePoints[2].y,
          curvePoints[2].z
        ),
        imageUrl: data.jwst[1].imageUrl,
        title: data.jwst[1].title,
        subtitle: data.jwst[1].subtitle,
      },
      {
        cameraRailDist: -3,
        position: new Vector3(
          curvePoints[3].x - 5,
          curvePoints[3].y,
          curvePoints[3].z
        ),
        imageUrl: data.jwst[2].imageUrl,
        title: data.jwst[2].title,
        subtitle: data.jwst[2].subtitle,
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[4].x + 3.5,
          curvePoints[4].y,
          curvePoints[4].z - 12
        ),
        imageUrl: data.jwst[3].imageUrl,
        title: data.jwst[3].title,
        subtitle: data.jwst[3].subtitle,
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[5].x - 1,
          curvePoints[5].y,
          curvePoints[5].z - 12
        ),
        imageUrl: data.jwst[4].imageUrl,
        title: data.jwst[4].title,
        subtitle: data.jwst[4].subtitle,
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[6].x + 1,
          curvePoints[6].y,
          curvePoints[6].z - 12
        ),
        imageUrl: data.jwst[5].imageUrl,
        title: data.jwst[5].title,
        subtitle: data.jwst[5].subtitle,
      },
      {
        cameraRailDist: -3,
        position: new Vector3(
          curvePoints[7].x - 1,
          curvePoints[7].y,
          curvePoints[7].z - 12
        ),
        imageUrl: data.jwst[6].imageUrl,
        title: data.jwst[6].title,
        subtitle: data.jwst[6].subtitle,
      },
      {
        cameraRailDist: 2,
        position: new Vector3(
          curvePoints[8].x - 5,
          curvePoints[8].y,
          curvePoints[8].z - 12
        ),
        imageUrl: data.jwst[7].imageUrl,
        title: data.jwst[7].title,
        subtitle: data.jwst[7].subtitle,
      },
      {
        cameraRailDist: -2.5,
        position: new Vector3(
          curvePoints[9].x - 1,
          curvePoints[9].y,
          curvePoints[9].z - 12
        ),
        imageUrl: data.jwst[8].imageUrl,
        title: data.jwst[8].title,
        subtitle: data.jwst[8].subtitle,
      },

      {
        cameraRailDist: -2.5,
        position: new Vector3(
          curvePoints[10].x - 1,
          curvePoints[10].y,
          curvePoints[10].z - 12
        ),
        imageUrl: data.jwst[9].imageUrl,
        title: data.jwst[9].title,
        subtitle: data.jwst[9].subtitle,
      },
      {
        cameraRailDist: 2.5,
        position: new Vector3(
          curvePoints[11].x - 1,
          curvePoints[11].y,
          curvePoints[11].z - 12
        ),
        imageUrl: data.jwst[10].imageUrl,
        title: data.jwst[10].title,
        subtitle: data.jwst[10].subtitle,
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[12].x - 1,
          curvePoints[12].y,
          curvePoints[12].z - 12
        ),
        imageUrl: data.jwst[11].imageUrl,
        title: data.jwst[11].title,
        subtitle: data.jwst[11].subtitle,
      },
      {
        cameraRailDist: -1.5,
        position: new Vector3(
          curvePoints[13].x - 5,
          curvePoints[13].y,
          curvePoints[13].z - 12
        ),
        imageUrl: data.jwst[12].imageUrl,
        title: data.jwst[12].title,
        subtitle: data.jwst[12].subtitle,
      },
      {
        cameraRailDist: 1.5,
        position: new Vector3(
          curvePoints[14].x - 1,
          curvePoints[14].y,
          curvePoints[14].z - 12
        ),
        imageUrl: data.jwst[13].imageUrl,
        title: data.jwst[13].title,
        subtitle: data.jwst[13].subtitle,
      },
      {
        cameraRailDist: -1.5,
        position: new Vector3(
          curvePoints[15].x - 1,
          curvePoints[15].y,
          curvePoints[15].z - 12
        ),
        imageUrl: data.jwst[14].imageUrl,
        title: data.jwst[14].title,
        subtitle: data.jwst[14].subtitle,
      },
      {
        cameraRailDist: -1.5,
        position: new Vector3(
          curvePoints[16].x - 1,
          curvePoints[16].y,
          curvePoints[16].z - 12
        ),
        imageUrl: data.jwst[15].imageUrl,
        title: data.jwst[15].title,
        subtitle: data.jwst[15].subtitle,
      },
      {
        cameraRailDist: 2.5,
        position: new Vector3(
          curvePoints[17].x - 1,
          curvePoints[17].y,
          curvePoints[17].z - 12
        ),
        imageUrl: data.jwst[16].imageUrl,
        title: data.jwst[16].title,
        subtitle: data.jwst[16].subtitle,
      },
    ];
  }, [data]);

  const astroids = useMemo(
    () => [
      // STARTING
      {
        position: new Vector3(-3.5, -3.2, -7),
      },
      {
        position: new Vector3(3.5, -4, -10),
      },
      {
        scale: new Vector3(4, 4, 4),
        position: new Vector3(-18, 0.2, -68),
        rotation: new Euler(-Math.PI / 5, Math.PI / 6, 0),
      },
      {
        scale: new Vector3(2.5, 2.5, 2.5),
        position: new Vector3(10, -1.2, -52),
      },
      // FIRST POINT

      {
        scale: new Vector3(6, 6, 6),
        position: new Vector3(
          curvePoints[1].x - 20,
          curvePoints[1].y + 4,
          curvePoints[1].z + 28
        ),
        rotation: new Euler(0, Math.PI / 7, 0),
      },

      {
        rotation: new Euler(Math.PI / 2, Math.PI / 2, Math.PI / 3),
        scale: new Vector3(5, 5, 5),
        position: new Vector3(
          curvePoints[1].x + 60,
          curvePoints[1].y + 2,
          curvePoints[1].z - 82
        ),
      },
      {
        scale: new Vector3(5, 5, 5),
        position: new Vector3(
          curvePoints[1].x + 18,
          curvePoints[1].y - 14,
          curvePoints[1].z - 22
        ),
      },
      // SECOND POINT
      {
        scale: new Vector3(10, 10, 10),
        position: new Vector3(
          curvePoints[2].x - 8,
          curvePoints[2].y - 7,
          curvePoints[2].z + 50
        ),
      },

      {
        scale: new Vector3(4, 4, 4),
        position: new Vector3(
          curvePoints[2].x + 12,
          curvePoints[2].y + 1,
          curvePoints[2].z - 86
        ),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 3),
      },
      // THIRD POINT
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[3].x + 3,
          curvePoints[3].y - 10,
          curvePoints[3].z + 50
        ),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[3].x - 10,
          curvePoints[3].y,
          curvePoints[3].z + 30
        ),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
      },
      {
        scale: new Vector3(4, 4, 4),
        position: new Vector3(
          curvePoints[3].x - 20,
          curvePoints[3].y - 5,
          curvePoints[3].z - 8
        ),
        rotation: new Euler(Math.PI, 0, Math.PI / 5),
      },

      // FOURTH POINT
      {
        scale: new Vector3(2, 2, 2),
        position: new Vector3(
          curvePoints[4].x + 3,
          curvePoints[4].y - 10,
          curvePoints[4].z + 2
        ),
      },

      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[4].x - 4,
          curvePoints[4].y + 9,
          curvePoints[4].z - 62
        ),
        rotation: new Euler(Math.PI / 3, 0, Math.PI / 3),
      },
      // FINAL
      {
        scale: new Vector3(14, 14, 14),
        position: new Vector3(
          curvePoints[7].x + 2,
          curvePoints[7].y - 15,
          curvePoints[7].z + 60
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 6, 0),
      },
      {
        scale: new Vector3(14, 14, 14),
        position: new Vector3(
          curvePoints[8].x - 95,
          curvePoints[8].y - 15,
          curvePoints[8].z + 60
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 6, 0),
      },
      {
        scale: new Vector3(14, 14, 14),
        position: new Vector3(
          curvePoints[8].x + 2,
          curvePoints[8].y - 15,
          curvePoints[8].z + 60
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 6, 0),
      },
      {
        scale: new Vector3(14, 14, 14),
        position: new Vector3(
          curvePoints[10].x - 180,
          curvePoints[10].y - 15,
          curvePoints[10].z + 60
        ),
        rotation: new Euler(-Math.PI / 6, -Math.PI / 1, 0),
      },
      {
        scale: new Vector3(14, 14, 14),
        position: new Vector3(
          curvePoints[12].x + 27,
          curvePoints[12].y - 15,
          curvePoints[12].z + 80
        ),
        rotation: new Euler(-Math.PI / 6, -Math.PI / 1, 0),
      },
      {
        scale: new Vector3(7, 7, 7),
        position: new Vector3(
          curvePoints[12].x + 100,
          curvePoints[12].y - 27,
          curvePoints[12].z + 60
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 1, 0),
      },
      {
        scale: new Vector3(7, 7, 7),
        position: new Vector3(
          curvePoints[14].x + 10,
          curvePoints[14].y - 7,
          curvePoints[14].z + 60
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 1, 0),
      },
      {
        scale: new Vector3(7, 7, 7),
        position: new Vector3(
          curvePoints[14].x + 2,
          curvePoints[14].y - 10,
          curvePoints[14].z + 160
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 1, 0),
      },
      {
        scale: new Vector3(7, 7, 7),
        position: new Vector3(
          curvePoints[15].x + 2,
          curvePoints[15].y - 0,
          curvePoints[15].z + 50
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 1, 0),
      },
      {
        scale: new Vector3(7, 7, 7),
        position: new Vector3(
          curvePoints[15].x + 90,
          curvePoints[15].y - 0,
          curvePoints[15].z + 140
        ),
        rotation: new Euler(-Math.PI / 1, -Math.PI / 1, 0),
      },
      {
        scale: new Vector3(20, 20, 20),
        position: new Vector3(
          curvePoints[15].x - 20,
          curvePoints[15].y - 0,
          curvePoints[15].z - 50
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 1, 0),
      },
      {
        scale: new Vector3(20, 20, 20),
        position: new Vector3(
          curvePoints[16].x - 20,
          curvePoints[16].y - 0,
          curvePoints[16].z - 50
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 1, 0),
      },
      {
        scale: new Vector3(15, 15, 15),
        position: new Vector3(
          curvePoints[16].x + 70,
          curvePoints[16].y - 0,
          curvePoints[16].z - 50
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 1, 0),
      },
      {
        scale: new Vector3(20, 20, 20),
        position: new Vector3(
          curvePoints[17].x - 20,
          curvePoints[17].y - 0,
          curvePoints[17].z - 50
        ),
        rotation: new Euler(-Math.PI / 2, -Math.PI / 1, 0),
      },
    ],
    []
  );

  const clouds = useMemo(
    () => [
      // STARTING

      // FIRST POINT
      {
        scale: new Vector3(4, 4, 4),
        position: new Vector3(
          curvePoints[1].x + 10,
          curvePoints[1].y - 4,
          curvePoints[1].z + 64
        ),
      },

      {
        rotation: new Euler(0, Math.PI / 7, Math.PI / 5),
        scale: new Vector3(5, 5, 5),
        position: new Vector3(
          curvePoints[1].x - 13,
          curvePoints[1].y + 4,
          curvePoints[1].z - 62
        ),
      },

      // SECOND POINT

      {
        scale: new Vector3(2, 2, 2),
        position: new Vector3(
          curvePoints[2].x - 2,
          curvePoints[2].y + 4,
          curvePoints[2].z - 26
        ),
      },

      // THIRD POINT

      {
        scale: new Vector3(5, 5, 5),
        position: new Vector3(
          curvePoints[3].x + 0,
          curvePoints[3].y - 5,
          curvePoints[3].z - 98
        ),
        rotation: new Euler(0, Math.PI / 3, 0),
      },
      // FOURTH POINT

      {
        scale: new Vector3(10, 10, 10),
        position: new Vector3(
          curvePoints[4].x + 24,
          curvePoints[4].y - 6,
          curvePoints[4].z - 42
        ),
        rotation: new Euler(Math.PI / 4, 0, Math.PI / 5),
      },

      // FINAL

      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[7].x - 12,
          curvePoints[7].y + 5,
          curvePoints[7].z + 120
        ),
        rotation: new Euler(Math.PI / 4, Math.PI / 6, 0),
      },
      {
        scale: new Vector3(220, 14, 14),
        position: new Vector3(
          curvePoints[9].x + 125,
          curvePoints[9].y - 0,
          curvePoints[9].z + 30
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 6, 0),
      },
      {
        scale: new Vector3(220, 14, 14),
        position: new Vector3(
          curvePoints[9].x - 45,
          curvePoints[9].y - 20,
          curvePoints[9].z + 60
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 6, 0),
      },
      {
        scale: new Vector3(8, 8, 8),
        position: new Vector3(
          curvePoints[11].x + 60,
          curvePoints[11].y + 5,
          curvePoints[11].z + 120
        ),
        rotation: new Euler(Math.PI / 4, Math.PI / 6, 0),
      },
      {
        scale: new Vector3(3, 3, 3),
        position: new Vector3(
          curvePoints[11].x + 10,
          curvePoints[11].y - 12,
          curvePoints[11].z + 120
        ),
        rotation: new Euler(Math.PI / 4, Math.PI / 6, 0),
      },
      {
        scale: new Vector3(10, 10, 10),
        position: new Vector3(
          curvePoints[15].x + 50,
          curvePoints[15].y - 10,
          curvePoints[15].z - 80
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 1, 0),
      },
      {
        scale: new Vector3(15, 15, 15),
        position: new Vector3(
          curvePoints[16].x + 70,
          curvePoints[16].y - 10,
          curvePoints[16].z - 0
        ),
        rotation: new Euler(-Math.PI / 4, -Math.PI / 1, 0),
      },
    ],
    []
  );

  const shape = useMemo(() => {
    const shape = new THREE.Shape();
    shape.moveTo(0, -0.08);
    shape.lineTo(0, 0.08);

    return shape;
  }, [curve]);

  const cameraGroup = useRef();
  const cameraRail = useRef();
  const camera = useRef();
  const scroll = useScroll();
  const lastScroll = useRef(0);

  const { play, setHasScroll, end, setEnd } = usePlay();

  useFrame((_state, delta) => {
    if (window.innerWidth > window.innerHeight) {
      // LANDSCAPE
      camera.current.fov = 30;
      camera.current.position.z = 5;
    } else {
      // PORTRAIT
      camera.current.fov = 80;
      camera.current.position.z = 2;
    }

    if (lastScroll.current <= 0 && scroll.offset > 0) {
      setHasScroll(true);
    }

    if (play && !end && sceneOpacity.current < 1) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        1,
        delta * 0.1
      );
    }

    if (end && sceneOpacity.current > 0) {
      sceneOpacity.current = THREE.MathUtils.lerp(
        sceneOpacity.current,
        0,
        delta
      );
    }

    lineMaterialRef.current.opacity = sceneOpacity.current;

    if (end) {
      return;
    }

    const scrollOffset = Math.max(0, scroll.offset);

    let friction = 1;
    let resetCameraRail = true;
    // LOOK TO CLOSE TEXT SECTIONS
    textSections.forEach((textSection) => {
      const distance = textSection.position.distanceTo(
        cameraGroup.current.position
      );

      if (distance < FRICTION_DISTANCE) {
        friction = Math.max(distance / FRICTION_DISTANCE, 0.1);
        const targetCameraRailPosition = new Vector3(
          (1 - distance / FRICTION_DISTANCE) * textSection.cameraRailDist,
          0,
          0
        );
        cameraRail.current.position.lerp(targetCameraRailPosition, delta);
        resetCameraRail = false;
      }
    });
    if (resetCameraRail) {
      const targetCameraRailPosition = new Vector3(0, 0, 0);
      cameraRail.current.position.lerp(targetCameraRailPosition, delta);
    }

    // CALCULATE LERPED SCROLL OFFSET
    let lerpedScrollOffset = THREE.MathUtils.lerp(
      lastScroll.current,
      scrollOffset,
      delta * friction
    );
    // PROTECT BELOW 0 AND ABOVE 1
    lerpedScrollOffset = Math.min(lerpedScrollOffset, 1);
    lerpedScrollOffset = Math.max(lerpedScrollOffset, 0);

    lastScroll.current = lerpedScrollOffset;
    tl.current.seek(lerpedScrollOffset * tl.current.duration());

    const curPoint = curve.getPoint(lerpedScrollOffset);

    // Follow the curve points
    cameraGroup.current.position.lerp(curPoint, delta * 24);

    // Make the group look ahead on the curve

    const lookAtPoint = curve.getPoint(
      Math.min(lerpedScrollOffset + CURVE_AHEAD_CAMERA, 1)
    );

    const currentLookAt = cameraGroup.current.getWorldDirection(
      new THREE.Vector3()
    );
    const targetLookAt = new THREE.Vector3()
      .subVectors(curPoint, lookAtPoint)
      .normalize();

    const lookAt = currentLookAt.lerp(targetLookAt, delta * 24);
    cameraGroup.current.lookAt(
      cameraGroup.current.position.clone().add(lookAt)
    );

    // Airplane rotation

    const tangent = curve.getTangent(lerpedScrollOffset + CURVE_AHEAD_AIRPLANE);

    const nonLerpLookAt = new Group();
    nonLerpLookAt.position.copy(curPoint);
    nonLerpLookAt.lookAt(nonLerpLookAt.position.clone().add(targetLookAt));

    tangent.applyAxisAngle(
      new THREE.Vector3(0, 1, 0),
      -nonLerpLookAt.rotation.y
    );

    let angle = Math.atan2(-tangent.z, tangent.x);
    angle = -Math.PI / 2 + angle;

    let angleDegrees = (angle * 180) / Math.PI;
    angleDegrees *= 2.4; // stronger angle

    // LIMIT PLANE ANGLE
    if (angleDegrees < 0) {
      angleDegrees = Math.max(angleDegrees, -AIRPLANE_MAX_ANGLE);
    }
    if (angleDegrees > 0) {
      angleDegrees = Math.min(angleDegrees, AIRPLANE_MAX_ANGLE);
    }

    // SET BACK ANGLE
    angle = (angleDegrees * Math.PI) / 180;

    const targetAirplaneQuaternion = new THREE.Quaternion().setFromEuler(
      new THREE.Euler(
        airplane.current.rotation.x,
        airplane.current.rotation.y,
        angle
      )
    );
    airplane.current.quaternion.slerp(targetAirplaneQuaternion, delta * 2);

    if (
      cameraGroup.current.position.z <
      curvePoints[curvePoints.length - 1].z + 100
    ) {
      setEnd(true);
      planeOutTl.current.play();
    }
  });

  const airplane = useRef();

  const tl = useRef();
  const backgroundColors = useRef({
    colorA: "#3535cc",
    colorB: "#abaadd",
  });

  const planeInTl = useRef();
  const planeOutTl = useRef();

  useLayoutEffect(() => {
    tl.current = gsap.timeline();

    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#274471",
      colorB: "#93614a",
    });
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#424242",
      colorB: "#ffcc00",
    });
    tl.current.to(backgroundColors.current, {
      duration: 1,
      colorA: "#81318b",
      colorB: "#55ab8f",
    });

    tl.current.pause();

    planeInTl.current = gsap.timeline();
    planeInTl.current.pause();
    planeInTl.current.from(airplane.current.position, {
      duration: 3,
      z: 5,
      y: -2,
    });

    planeOutTl.current = gsap.timeline();
    planeOutTl.current.pause();

    planeOutTl.current.to(
      airplane.current.position,
      {
        duration: 10,
        z: -250,
        y: 10,
      },
      0
    );
    planeOutTl.current.to(
      cameraRail.current.position,
      {
        duration: 8,
        y: 12,
      },
      0
    );
    planeOutTl.current.to(airplane.current.position, {
      duration: 1,
      z: -1000,
    });
  }, []);

  useEffect(() => {
    if (play) {
      planeInTl.current.play();
    }
  }, [play]);

  return useMemo(
    () => (
      <>
        {/* <OrbitControls /> */}
        <directionalLight position={[0, 3, 1]} intensity={0.5} />
        <group ref={cameraGroup}>
          <Speed />
          <Background backgroundColors={backgroundColors} />
          <group ref={cameraRail}>
            <PerspectiveCamera
              ref={camera}
              position={[0, 0, 5]}
              fov={30}
              makeDefault
            />
          </group>
          <group ref={airplane}>
            <Float floatIntensity={2} speed={2} rotationIntensity={0.5}>
              {/* <Airplane
                rotation-y={Math.PI / 2}
                scale={[0.2, 0.2, 0.2]}
                position-y={0.1}
              /> */}
              <Paperplane
                rotation-y={Math.PI / 2}
                scale={[1, 1, 1]}
                position-y={0.1}
              />
            </Float>
          </group>
        </group>
        {/* TEXT */}
        {textSections.map((textSection, index) => (
          <TextSection {...textSection} key={index} />
        ))}

        {/* LINE */}
        <group position-y={-2}>
          <mesh>
            <extrudeGeometry
              args={[
                shape,
                {
                  steps: LINE_NB_POINTS,
                  bevelEnabled: false,
                  extrudePath: curve,
                },
              ]}
            />
            <meshStandardMaterial
              color={"white"}
              ref={lineMaterialRef}
              transparent
              envMapIntensity={2}
              onBeforeCompile={fadeOnBeforeCompile}
            />
          </mesh>
        </group>

        {/* CLOUDS */}
        {clouds.map((cloud, index) => (
          <Cloud sceneOpacity={sceneOpacity} {...cloud} key={index} />
        ))}
        {/* astroids */}
        {astroids.map((astroid, index) => (
          <Astroid sceneOpacity={sceneOpacity} {...astroid} key={index} />
        ))}
      </>
    ),
    []
  );
};
