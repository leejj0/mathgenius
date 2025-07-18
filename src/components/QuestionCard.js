export default function QuestionCard({ question, options, answer, explanation, index, grade, topic }) {
  return (
    <div className="question-card">
      {grade && topic && (
        <div className="question-meta">年级：{grade}　知识点：{topic}</div>
      )}
      <h3>{index !== undefined ? `第${index}题：` : ''}{question}</h3>
      <ul>
        {options.map((opt, idx) => (
          <li key={idx}>{opt}</li>
        ))}
      </ul>
      <div>答案：{answer}</div>
      <div>解析：{explanation}</div>
    </div>
  );
}