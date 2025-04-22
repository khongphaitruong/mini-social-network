const express = require('express');
require('dotenv').config();
const db = require('./db'); // ← gọi kết nối

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
//import route
const postCategoryRoutes = require('./post_categories/postCategory.route');
const postRoutes = require('./post_manage/postManage.route');
const reportCategoryRoutes = require('./report_categories/reportCategory.route');
const reportRoutes = require('./report_manage/reportManage.route');
const likeRoutes = require('./like_manage/likeManage.route');
const commentRoutes = require('./comment_manage/commentManager.route');
const userProfileRoutes = require('./user_profiles/userProfile.route');
const friendRoutes = require('./friends/friend.route');
const messengerRoutes = require('./messenger/messenger.route');
const accountRoutes = require('./accounts/account.route');
const authRoutes = require('./auth/auth.route');
// Sử dụng route
app.use('/api/post_categories', postCategoryRoutes);
app.use('/api/posts', postRoutes);
app.use('/api/report_categories', reportCategoryRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);
app.use('/api/user_profiles', userProfileRoutes);
app.use('/api/friends', friendRoutes);
app.use('/api/messengers', messengerRoutes);
app.use('/api/accounts', accountRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Server đang chạy và kết nối MySQL OK!');
});

app.listen(PORT, () => {
  console.log(`🚀 Server đang chạy tại http://localhost:${PORT}`);
});
