import { useState } from 'react';

export default function MathForm({ onSubmit }) {
  const [grade, setGrade] = useState('三年级');
  const [topic, setTopic] = useState('乘法口诀');

  const topicsByGrade = {
    '一年级': ['加法', '减法'],
    '二年级': ['乘法口诀', '简单除法'],
    '三年级': ['分数', '几何基础']
  };

  return (
    <div className="form">
      <select value={grade} onChange={e => {
        setGrade(e.target.value);
        setTopic(topicsByGrade[e.target.value][0]);
      }}>
        {Object.keys(topicsByGrade).map(g =>
          <option key={g} value={g}>{g}</option>
        )}
      </select>
      <div className="topics">
        {topicsByGrade[grade].map(t => (
          <label key={t}>
            <input
              type="radio"
              checked={topic === t}
              onChange={() => setTopic(t)}
            />
            {t}
          </label>
        ))}
      </div>
      <button onClick={() => onSubmit(grade, topic)}>
        生成题目
      </button>
    </div>
  );
}