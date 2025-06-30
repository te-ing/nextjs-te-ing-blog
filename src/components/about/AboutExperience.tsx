import React from 'react';
import { EXPERIENCE } from './aboutContants';

const AboutExperience = () => (
  <section>
    <h2 className="text-2xl font-bold mb-4">주요 업무</h2>
    <ul className="list-disc pl-6 space-y-4 text-lg">
      {EXPERIENCE.map((experience, index) => (
        <li key={index}>
          <h3 className="text-lg font-bold">{experience.title}</h3>
          <p className="mb-2 text-base">{experience.subTitle}</p>
          <ul className="list-disc pl-6 space-y-1 text-gray-600 text-[0.9em]">
            {experience.content.map((content, index) => (
              <li key={index}>{content}</li>
            ))}
          </ul>
        </li>
      ))}
    </ul>
  </section>
);

export default AboutExperience;
