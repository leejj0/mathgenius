import React from 'react';

export default function QuestionCard({ question, options, answer, explanation, index, grade, topic, showAnswer, setShowAnswer }) {
  return (
    <div className="question-card">
      {grade && topic && (
        <div className="question-meta">年级：{grade}　知识点：{topic}</div>
      )}
      <h3>{index !== undefined ? `第${index}题：` : ''}{question}</h3>
      <ul>
        {options.map((opt, idx) => (
          <li
            key={idx}
            className={showAnswer && opt === answer ? 'option-correct' : ''}
          >
            {opt}
          </li>
        ))}
      </ul>
      {!showAnswer && (
        <button className="show-answer-btn" onClick={() => setShowAnswer(true)} style={{ marginTop: 12, padding: '8px 20px', borderRadius: 10, fontSize: '1rem', background: '#2d8cf0', color: '#fff', border: 'none', cursor: 'pointer' }}>展示答案</button>
      )}
      {showAnswer && <div style={{ marginTop: 8 }}>答案：<span style={{ color: '#2d8cf0', fontWeight: 'bold' }}>{answer}</span></div>}
      {showAnswer && <div style={{ marginTop: 4 }}>解析：{explanation}</div>}
    </div>
  );
}