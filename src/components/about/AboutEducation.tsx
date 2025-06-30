import { EDUCATION } from './aboutContants';

export default function AboutEducation() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-4 text-gray-900">학력 및 교육</h2>
      <ul className="space-y-2">
        {EDUCATION.map((edu, idx) => (
          <li key={idx} className="text-gray-700">
            <span className="font-medium">{edu.period}</span> | {edu.school} (
            {edu.detail})
          </li>
        ))}
      </ul>
    </section>
  );
}
