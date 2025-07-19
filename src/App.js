import './App.css';
import MathForm from './components/MathForm';
import QuestionCard from './components/QuestionCard';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useState } from 'react';
import BrandLogo from './components/BrandLogo';
import React from 'react';

function Home() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const handleGenerate = async (grade, topic) => {
    setLoading(true);
    setError(null);
    try {
      // 先生成一道题
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade, topic, count: 1 })
      });
      if (!res.ok) throw new Error('API请求失败');
      const data = await res.json();
      navigate('/quiz', { state: { grade, topic, firstQuestion: data[0] } });
    } catch (err) {
      setError('生成失败，请稍后重试！');
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="App">
      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <BrandLogo size={40} />
        MathGenius
      </h1>
      <MathForm onSubmit={handleGenerate} />
      {loading && (
        <div className="loading-area">
          <div className="cute-loading">
            <svg className="star-spin" width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="30,5 36,22 55,22 39,33 45,50 30,39 15,50 21,33 5,22 24,22" fill="#ffe066" stroke="#f9ca24" strokeWidth="2" />
            </svg>
            <div className="loading-text">正在生成题目...</div>
          </div>
        </div>
      )}
      {!loading && error && (
        <div className="empty-area">
          <div className="empty-text">{error}</div>
        </div>
      )}
    </div>
  );
}

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const { grade, topic, firstQuestion } = location.state || {};
  const [questions, setQuestions] = useState(firstQuestion ? [firstQuestion] : []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [index, setIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const BATCH_SIZE = 5;

  if (!grade || !topic) {
    navigate('/');
    return null;
  }

  // 批量加载题目
  const fetchBatch = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ grade, topic, count: BATCH_SIZE })
      });
      if (!res.ok) throw new Error('API请求失败');
      const data = await res.json();
      setQuestions(qs => [...qs, ...data]);
    } catch (err) {
      setError('生成失败，请稍后重试！');
    } finally {
      setLoading(false);
    }
  };

  // 上一题逻辑
  const handlePrev = () => {
    if (index > 0) {
      setIndex(i => i - 1);
      setShowAnswer(false);
    }
  };

  // 下一题逻辑
  const handleNext = async () => {
    if (index < questions.length - 1) {
      setIndex(i => i + 1);
      setShowAnswer(false);
    } else {
      await fetchBatch();
      setIndex(i => i + 1);
      setShowAnswer(false);
    }
  };

  // 首次进入时如果只有一道题，先预取一批
  React.useEffect(() => {
    if (questions.length < BATCH_SIZE) {
      fetchBatch();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="App">
      <h1 style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
        <BrandLogo size={40} />
        MathGenius
      </h1>
      <div style={{ marginBottom: 16, color: '#00b894', fontWeight: 'bold' }}>年级：{grade}　知识点：{topic}</div>
      {loading && (
        <div className="loading-area">
          <div className="cute-loading">
            <svg className="star-spin" width="48" height="48" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="30,5 36,22 55,22 39,33 45,50 30,39 15,50 21,33 5,22 24,22" fill="#ffe066" stroke="#f9ca24" strokeWidth="2" />
            </svg>
            <div className="loading-text">正在加载题目...</div>
          </div>
        </div>
      )}
      {!loading && error && (
        <div className="empty-area">
          <div className="empty-text">{error}</div>
        </div>
      )}
      {!loading && !error && questions[index] && (
        <QuestionCard {...questions[index]} index={index + 1} grade={grade} topic={topic} showAnswer={showAnswer} setShowAnswer={setShowAnswer} />
      )}
      <div style={{ marginTop: 16, display: 'flex', justifyContent: 'center', gap: 16 }}>
        <button onClick={() => navigate('/')} style={{ padding: '8px 18px', borderRadius: 12, fontSize: '1rem' }}>返回首页</button>
        <button onClick={handlePrev} disabled={index === 0} style={{ padding: '8px 18px', borderRadius: 12, fontSize: '1rem', opacity: index === 0 ? 0.5 : 1 }}>上一题</button>
        <button onClick={handleNext} style={{ padding: '8px 18px', borderRadius: 12, fontSize: '1rem' }}>下一题</button>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="App-bg-abs">
        {/* 彩虹 */}
        <div className="abs-deco rainbow">
          <svg width="220" height="60" viewBox="0 0 220 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 50 Q110 -30 210 50" stroke="#ff7675" strokeWidth="10" fill="none" />
            <path d="M20 50 Q110 -10 200 50" stroke="#fdcb6e" strokeWidth="10" fill="none" />
            <path d="M30 50 Q110 10 190 50" stroke="#00b894" strokeWidth="10" fill="none" />
            <path d="M40 50 Q110 30 180 50" stroke="#0984e3" strokeWidth="10" fill="none" />
          </svg>
        </div>
        {/* 太阳 */}
        <div className="abs-deco sun">
          <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="40" cy="40" r="22" fill="#ffe066" stroke="#fdcb6e" strokeWidth="4" />
            <g stroke="#fdcb6e" strokeWidth="4">
              <line x1="40" y1="6" x2="40" y2="22" />
              <line x1="40" y1="58" x2="40" y2="74" />
              <line x1="6" y1="40" x2="22" y2="40" />
              <line x1="58" y1="40" x2="74" y2="40" />
              <line x1="15" y1="15" x2="27" y2="27" />
              <line x1="65" y1="15" x2="53" y2="27" />
              <line x1="15" y1="65" x2="27" y2="53" />
              <line x1="65" y1="65" x2="53" y2="53" />
            </g>
          </svg>
        </div>
        {/* 云朵 */}
        <div className="abs-deco cloud1">
          <svg width="100" height="50" viewBox="0 0 100 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="30" cy="35" rx="20" ry="15" fill="#dff9fb" />
            <ellipse cx="50" cy="30" rx="25" ry="18" fill="#dff9fb" />
            <ellipse cx="70" cy="38" rx="15" ry="12" fill="#dff9fb" />
          </svg>
        </div>
        <div className="abs-deco cloud2">
          <svg width="70" height="40" viewBox="0 0 70 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="20" cy="30" rx="15" ry="10" fill="#dff9fb" />
            <ellipse cx="40" cy="20" rx="20" ry="14" fill="#dff9fb" />
            <ellipse cx="60" cy="32" rx="10" ry="8" fill="#dff9fb" />
          </svg>
        </div>
        {/* 新增云朵3 */}
        <div className="abs-deco cloud3">
          <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="15" cy="20" rx="10" ry="7" fill="#dff9fb" />
            <ellipse cx="30" cy="15" rx="15" ry="10" fill="#dff9fb" />
            <ellipse cx="50" cy="22" rx="8" ry="6" fill="#dff9fb" />
          </svg>
        </div>
        {/* 星星 */}
        <div className="abs-deco star1">
          <svg width="40" height="40" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,5 36,22 55,22 39,33 45,50 30,39 15,50 21,33 5,22 24,22" fill="#ffe066" stroke="#f9ca24" strokeWidth="2" />
          </svg>
        </div>
        <div className="abs-deco star2">
          <svg width="30" height="30" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,5 36,22 55,22 39,33 45,50 30,39 15,50 21,33 5,22 24,22" fill="#fff200" stroke="#f9ca24" strokeWidth="2" />
          </svg>
        </div>
        {/* 新增星星3 */}
        <div className="abs-deco star3">
          <svg width="24" height="24" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <polygon points="30,5 36,22 55,22 39,33 45,50 30,39 15,50 21,33 5,22 24,22" fill="#f6e58d" stroke="#f9ca24" strokeWidth="2" />
          </svg>
        </div>
        {/* 气球 */}
        <div className="abs-deco balloon1">
          <svg width="60" height="90" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="40" cy="50" rx="30" ry="40" fill="#7ed6df" />
            <ellipse cx="40" cy="50" rx="20" ry="30" fill="#fff" fillOpacity="0.3" />
            <rect x="37" y="90" width="6" height="20" rx="3" fill="#22a6b3" />
            <path d="M40 90 Q35 100 40 110 Q45 100 40 90" stroke="#22a6b3" strokeWidth="2" fill="none" />
          </svg>
        </div>
        <div className="abs-deco balloon2">
          <svg width="40" height="60" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
            <ellipse cx="40" cy="50" rx="20" ry="30" fill="#fab1a0" />
            <ellipse cx="40" cy="50" rx="12" ry="18" fill="#fff" fillOpacity="0.3" />
            <rect x="37" y="90" width="6" height="20" rx="3" fill="#e17055" />
            <path d="M40 90 Q35 100 40 110 Q45 100 40 90" stroke="#e17055" strokeWidth="2" fill="none" />
          </svg>
        </div>
        {/* 新增爱心 */}
        <div className="abs-deco heart">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M18 32s-12-7.36-12-16A8 8 0 0 1 18 8a8 8 0 0 1 12 8c0 8.64-12 16-12 16z" fill="#ff7675" stroke="#d63031" strokeWidth="2" />
          </svg>
        </div>
        {/* 笑脸 */}
        <div className="abs-deco smile">
          <svg width="50" height="50" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="30" cy="30" r="28" fill="#ffeaa7" stroke="#fdcb6e" strokeWidth="2" />
            <ellipse cx="22" cy="28" rx="4" ry="6" fill="#fff" />
            <ellipse cx="38" cy="28" rx="4" ry="6" fill="#fff" />
            <ellipse cx="22" cy="28" rx="2" ry="3" fill="#636e72" />
            <ellipse cx="38" cy="28" rx="2" ry="3" fill="#636e72" />
            <path d="M20 40 Q30 48 40 40" stroke="#e17055" strokeWidth="3" fill="none" />
          </svg>
        </div>
        {/* 加号数学符号 */}
        <div className="abs-deco plus">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="15" y="5" width="6" height="26" rx="3" fill="#00b894" />
            <rect x="5" y="15" width="26" height="6" rx="3" fill="#00b894" />
          </svg>
        </div>
        {/* 新增乘号数学符号 */}
        <div className="abs-deco times">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="16" y="5" width="4" height="26" rx="2" fill="#e17055" transform="rotate(45 18 18)" />
            <rect x="16" y="5" width="4" height="26" rx="2" fill="#e17055" transform="rotate(-45 18 18)" />
          </svg>
        </div>
        {/* 新增减号数学符号 */}
        <div className="abs-deco minus">
          <svg width="36" height="36" viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="15" width="26" height="6" rx="3" fill="#fdcb6e" />
          </svg>
        </div>
        {/* 新增彩色圆点 */}
        <div className="abs-deco dot1">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="9" cy="9" r="9" fill="#00b894" />
          </svg>
        </div>
        <div className="abs-deco dot2">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="7" cy="7" r="7" fill="#fdcb6e" />
          </svg>
        </div>
        <div className="abs-deco dot3">
          <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5" cy="5" r="5" fill="#e17055" />
          </svg>
        </div>
        {/* 路由内容 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quiz" element={<Quiz />} />
        </Routes>
      </div>
    </Router>
  );
}