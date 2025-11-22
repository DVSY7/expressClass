//expressClass/controller/userController.js
import db from '../config/db.js';
import bcrypt from 'bcrypt';
import chalk from 'chalk';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { userID, userPassword } = req.body;

  // 나중에 회원가입을 구현할 때 해야하는 로직
  // 비밀번호 해시 계산 반복횟수(숫자가 높을수록 느려짐 즉, 해킹시도가 어려워짐)
  // const saltRounds = 10;
  // // 100시도했을 때 결과가 빨리빨리 생성되니까 해킹이 좀더 수월하고
  // // 100번을 시도하더라도 시간이 10배가 걸려 한마디로 해킹시도를 더 늦추거나 어렵게 만드는 설정이야
  // // 비밀번호를 암호화 하는 로직
  // const secretPassword = await bcrypt.hash(userPassword,saltRounds);

  // 여기서부터는 로그인 로직을 구현하도록 하겠습니다.
  // 지금은 아이디 검증부분은 생략하겠습니다.
  // 비밀번호만 비교하고 로그인 처리가 되도록 구현
  try {
    // 현재 아이디를 입력한 사용자가 데이터베이스에 존재하는지 확인
    const [row] = await db.query(
      `SELECT user_id, user_password FROM users WHERE user_id = ?`,
      [userID]
    );

    // const [row] = await db.query(
    //   `INSERT INTO users(user_id, user_password) VALUES(?,?)`,
    //   [userID, secretPassword]
    // )

    // // 해당 아이디가 존재하지 않으면 예외처리
    if (row.length === 0) {
      // 아직클라이언트에선 확인하지 않았지만 서버에서 성공유무를 확인하기 위한
      // 디버그 코드
      console.log(chalk.blue('존재하지 않는 사용자입니다.'));
      return res
        .status(200)
        .json({ msg: '아이디 또는 비밀번호가 틀립니다.', id_check: false });
    } else {
      // 데이터베이스 비밀번호와 사용자가 입력한 비밀번호 비교
      const isMatch = await bcrypt.compare(userPassword, row[0].user_password);
      // 비교한 값이 일치하면 성공 / 일치하지 않으면 실패 처리
      if (isMatch) {
        // 디버그코드
        console.log(chalk.blue('비밀번호가 일치합니다.'));

        const token = jwt.sign(
          { userID: row[0].user_id },
          process.env.JWT_SECRET,
          { expiresIn: process.env.JWT_EXPIRES_IN }
        );
        return res.status(200).json({ pw_check: true, token });
      } else {
        // 디버그코드
        console.log(chalk.blue('비밀번호가 일치하지않습니다.'));
        return res
          .status(200)
          .json({ msg: '아이디 또는 비밀번호가 틀립니다.', pw_check: false });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ msg: err });
  }
};

export const text = (req, res) => {
  console.log('요청성공!');
  res.send('텍스트를 적용');
};
