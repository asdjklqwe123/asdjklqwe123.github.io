export default function handler(req, res) {
  // 设置 CORS (允许跨域访问)
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { board } = req.body;

  // --- AI 逻辑开始 ---
  
  // 1. 找出所有空位
  const emptyIndices = board
    .map((val, idx) => val === "" ? idx : null)
    .filter(val => val !== null);

  if (emptyIndices.length === 0) {
    return res.status(200).json({ move: null });
  }

  // 2. 简单的 AI 策略：随机移动
  const randomMove = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];

  // --- AI 逻辑结束 ---

  return res.status(200).json({ move: randomMove });
}