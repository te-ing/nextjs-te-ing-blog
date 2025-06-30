import React from 'react';
import { ABOUT_ME } from './aboutContants';

const AboutMe = () => (
  <section>
    <h2 className="text-2xl font-bold mb-4 text-gray-900">About Me</h2>
    <div className="space-y-4 text-lg">
      {ABOUT_ME.map(({ title, content }, index) => (
        <div key={index}>
          <h3 className="text-lg font-bold">{title}</h3>
          <p className="text-base text-gray-700">{content}</p>
        </div>
      ))}
    </div>
  </section>
);

export default AboutMe;
