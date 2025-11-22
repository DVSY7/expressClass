//expressClass/controller/userController.js
import db from '../config/db.js';

export const login = async (req, res) => {
  const { userID, userPassword } = req.body;
  try {
    const [row] = await db.query(`SELECT * FROM users`);
    // const [row] = await db.query(`INSERT INTO users(user_id, user_password) VALUES(?,?)`, [
    //   userID,
    //   userPassword,
    // ]);
    console.log(row);
    return res.status(200).json({ msg: '요청성공', res: row });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
};

export const text = (req, res) => {
  console.log('요청성공!');
  res.send('텍스트를 적용');
};
