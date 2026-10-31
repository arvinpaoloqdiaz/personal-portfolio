'use client';
import { TypeAnimation } from 'react-type-animation';

export default function TypeEffect() {
  return (
    <TypeAnimation
      sequence={[
        'Full-Stack Engineer',
        4000,
        'Backend Engineer',
        4000,
        'DevOps & Cloud',
        4000,
        'Platform Engineer',
        4000,
      ]}
      repeat={Infinity}
    />
  );
}
