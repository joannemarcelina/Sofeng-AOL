import mysql from 'mysql';

export const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'skill_bridge'
});

db.connect(err => {
  if (err) throw err;
  console.log('[DONE] Connected to MySQL');
});
