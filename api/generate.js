export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { grade, topic } = req.body;
  console.log('当前API KEY:', process.env.DEEPSEEK_API_KEY); // 调试用
  const prompt = `
你是一名小学${grade}数学老师。请生成3道关于${topic}的选择题，每题4个选项，输出JSON数组格式：
[
  {question: "", options: ["A.","B.","C.","D."], answer: "A", explanation: ""},
  ...
]
`;

  try {
    const apiRes = await fetch('https://api.deepseek.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.DEEPSEEK_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'deepseek-chat',
        messages: [{ role: 'user', content: prompt }]
      })
    });
    const result = await apiRes.json();
    console.log('DeepSeek原始返回:', result);

    if (!result.choices || !result.choices[0] || !result.choices[0].message || !result.choices[0].message.content) {
      console.error('DeepSeek API返回异常:', result);
      return res.status(500).json({ error: 'AI返回异常', raw: result });
    }
    let content = result.choices[0].message.content;
    console.log('AI返回内容:', content);
    // 去除 Markdown 代码块标记
    content = content.replace(/```json|```/g, '').trim();
    let data;
    try {
      data = JSON.parse(content);
    } catch (parseErr) {
      console.error('JSON解析失败:', parseErr, content);
      return res.status(500).json({ error: 'AI返回内容格式错误', raw: content });
    }
    const withMeta = data.map(item => ({ ...item, grade, topic }));
    res.status(200).json(withMeta);
  } catch (e) {
    console.error('API调用失败:', e);
    res.status(500).json({ error: 'AI生成失败' });
  }
} 