import express from 'express';
import VisitorStat from '../models/VisitorStat.js';

const router = express.Router();

router.post('/visit', async (req, res) => {
  const today = new Date().toISOString().slice(0, 10);
  let stat = await VisitorStat.findOne();
  if (!stat) {
    stat = await VisitorStat.create({ date: today, totalCount: 1, todayCount: 1 });
    return res.json({ totalVisitors: stat.totalCount, todayVisitors: stat.todayCount });
  }

  if (stat.date !== today) {
    stat.date = today;
    stat.todayCount = 0;
  }

  stat.totalCount += 1;
  stat.todayCount += 1;
  await stat.save();

  return res.json({ totalVisitors: stat.totalCount, todayVisitors: stat.todayCount });
});

export default router;
