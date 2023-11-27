import React, { useRef, useState } from 'react';
import { Surface } from 'gl-react-dom';
import { Shaders, Node, GLSL } from 'gl-react';

// Define shaders
const shaders = Shaders.create({
  helloGl: {
    frag: GLSL`
precision highp float;
varying vec2 uv;
void main() {
  gl_FragColor = vec4(uv.x, uv.y, 0.5, 1.0);
}
`
  }
});

// ... Rest of your component

export const Canvas = () => {
  const [points, setPoints] = useState<Array<[number, number]>>([]);
  const divRef = useRef(null);

  const handleClick = (e) => {
    if (!divRef.current) return;

    console.log('points', points)
    const rect = divRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    const y = ((e.clientY - rect.top) / rect.height) * -2 + 1;

    setPoints([...points, [ x, y ]]);
  };


  return (
    <div ref={divRef} style={{ width: '600px', height: '600px' }} onClick={handleClick}>
      <Surface width={600} height={600}>
        <Node
          shader={shaders.helloGl}
        />
      </Surface>
    </div>
  );
}
