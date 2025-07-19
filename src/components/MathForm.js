import { useState } from 'react';

export default function MathForm({ onSubmit }) {
  const [grade, setGrade] = useState('三年级');
  const [topic, setTopic] = useState('乘法口诀');

  const topicsByGrade = {
    '一年级': ['加法', '减法'],
    '二年级': ['乘法口诀', '简单除法'],
    '三年级': ['分数', '几何基础'],
    '四年级': ['小数', '复杂除法'],
    '五年级': ['百分数', '面积体积'],
    '六年级': ['比例', '应用题']
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
          <div
            key={t}
            className={`topic-card${topic === t ? ' selected' : ''}`}
            onClick={() => setTopic(t)}
            tabIndex={0}
            role="button"
            style={{ outline: 'none' }}
            onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') setTopic(t); }}
          >
            {t}
          </div>
        ))}
      </div>
      <button onClick={() => onSubmit(grade, topic)}>
        生成题目
      </button>
    </div>
  );
}