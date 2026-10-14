'use client';
import { TypeAnimation } from 'react-type-animation';

export default function TypeEffect() {
  return (
    <TypeAnimation
      sequence={[
        'Frontend',
        5000,
        'Backend',
        5000,
        'Full-Stack',
        5000,
      ]}
      repeat={Infinity}
    />
  );
}
