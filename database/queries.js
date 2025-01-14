const mysql = require('mysql2');

const con = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'records',
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connected Successfully!");
});

function insert(name, email, phone, brief_description, skills, education, experience, address) {
  const query = 'INSERT INTO users(name, email, phone, brief_description, skills, education, experience, address) VALUES(?,?,?,?,?,?,?,?)';
  return new Promise((resolve, reject) => {
    con.query(query, [name, email, phone, brief_description, skills, JSON.stringify(education), JSON.stringify(experience), address], (err, result) => {
      if (err) {
        return reject(err);
      } else {
        return resolve(result);
      }
    });
  })
}

async function select() {
  const query = 'SELECT * FROM users';
  return new Promise((resolve, reject) => {
    con.query(query, (err, result) => {
      if (err) return reject(err);
      else {
        return resolve(result);
      }
    })
  })
}

async function selectWithId(id) {
  const query = 'SELECT * FROM users WHERE id = ?';
  return new Promise((resolve, reject) => {
    con.query(query, [id], (err, result) => {
      if (err) return reject(err);
      else {
        return resolve(result);
      }
    })
  })
}

async function update(name, email, phone, brief_description, skills, education, experience, address, id) {
  const query = 'UPDATE users SET name = ?, email = ?, phone = ?, brief_description = ?, skills = ?, education = ?, experience = ?, address = ? WHERE id = ?';
  return new Promise((resolve, reject) => {
    con.query(query, [name, email, phone, brief_description, skills, JSON.stringify(education), JSON.stringify(experience), address, id], (err, result) => {
      if (err) {
        return reject(err)
      } else {
        return resolve(result)
      }
    });
  })
}

async function selectWithEmail(email) {
  const query = 'SELECT * FROM users WHERE email = ?';
  return new Promise((resolve, reject) => {
    con.query(query, [email], (err, result) => {
      if (err) return reject(err);
      else {
        return resolve(result);
      }
    })
  })
}

async function deleteWithId(id) {
  const query = "DELETE FROM users WHERE id = ?";
  return new Promise((resolve, reject) => {
    con.query(query, [id], (err, result) => {
      if (err) return reject(err);
      else return resolve(err);
    })
  })


}
module.exports = { insert, select, selectWithId, update, selectWithEmail, deleteWithId };
