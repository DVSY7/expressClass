// server를 키기 위한 express 함수를 불러옴
import express from 'express';
// env 파일에 node가 접근할 수 있도록 해주는 라이브러리
// 서로 다른 포트가 상호작용할 수 있도록 도와주는 cors 정책해제
import cors from 'cors';

const App = express();
const PORT = process.env.SERVER_PORT | 5000;

// 위에서 불러온 cors라이브러리를 express에서 사용하겠다.
App.use(cors());
App.use(express.json());
App.use(express.urlencoded({ extended: true }));

// API 만드는 방법
// 함수 작성 양식
// App.post(첫번째 파라미터(경로), 실행할 동작(전달값1, 전달값2)=>{})
App.post(`/login`, (req, res) => {
  const { userID, userPassword } = req.body;

  console.log(userID, userPassword);

  // res.send('회원정보가 정상처리 됌.');
});

App.get('/text', (req, res) => {
  res.status(403).json({ massage: '정상처리됌!' });
});

App.get('/click', (req, res) => {
  console.log('유저가 버튼을 클릭했어요');
  res.send('유저가 버튼을 클릭했어요!');
});

App.listen(PORT, () => {
  // 서버 정상작동 여부를 확인하기 위해 추가한 콜백함수
  console.log(`서버가 ${PORT}에서 실행 됨!`);
});
