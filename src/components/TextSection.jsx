import React from "react";
import { Text, Image } from "@react-three/drei";
import { fadeOnBeforeCompileFlat } from "../utils/fadeMaterial";

export const TextSection = ({ imageUrl, title, subtitle, ...props }) => {

  return (
    <group {...props}>
      {!!imageUrl && (
        <Image
          scale={[5, 3.2, 4]}
          url={imageUrl}
          toneMapped={false}
          position-y={1.4}
          position-x={2.3}
          position-z={-0.3}
          opacity={1}
        >
          {imageUrl}
          <imageMaterial
            transparent
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Image>
        
      )}

      {!!title && (
        <Text
          color="white"
          anchorX={"left"}
          anchorY="bottom"
          fontSize={0.52}
          maxWidth={3.5}
          lineHeight={1}
          font={"./fonts/DMSerifDisplay-Regular.ttf"}
        >
          {title}
          <meshStandardMaterial
            color={"black"}
            onBeforeCompile={fadeOnBeforeCompileFlat}
          />
        </Text>
      )}

      <Text
        color="white"
        anchorX={"left"}
        anchorY="top"
        fontSize={0.22}
        maxWidth={4.5}
        position-y={-0.3}
        font={"./fonts/Inter-Regular.ttf"}
      >
        {subtitle}
        <meshStandardMaterial
          color={"black"}
          onBeforeCompile={fadeOnBeforeCompileFlat}
        />
      </Text>
    </group>
  );
};

// export default TextSection;