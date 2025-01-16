import { Canvas } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

export const ThreeBackground = () => {
  const isDark = useSelector((state: RootState) => state.theme.isDark);

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas>
        {isDark && <Stars />}
        <ambientLight intensity={isDark ? 0.1 : 0.5} />
        <pointLight position={[10, 10, 10]} />
      </Canvas>
    </div>
  );
};