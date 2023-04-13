const express = require("express");
const router = express.Router();

router.get("/", async (req, res)=>{
  // получаем всех пользователей
  const users = await User.find({});
  res.send(users);
});

router.get("/:id", async(req, res)=>{

  const id = req.params.id;
  // получаем одного пользователя по id
  const user = await User.findById(id);
  if(user) res.send(user);
  else res.sendStatus(404);
});

router.post("/", jsonParser, async (req, res) =>{

  if(!req.body) return res.sendStatus(400);

  const userName = req.body.name;
  const userAge = req.body.age;
  const user = new User({name: userName, age: userAge});
  // сохраняем в бд
  await user.save();
  res.send(user);
});

router.delete("/:id", async(req, res)=>{

  const id = req.params.id;
  // удаляем по id
  const user = await User.findByIdAndDelete(id);
  if(user) res.send(user);
  else res.sendStatus(404);
});

router.put("/", jsonParser, async (req, res)=>{

  if(!req.body) return res.sendStatus(400);
  const id = req.body.id;
  const userName = req.body.name;
  const userAge = req.body.age;
  const newUser = {age: userAge, name: userName};
  // обновляем данные пользователя по id
  const user = await User.findOneAndUpdate({_id: id}, newUser, {new: true});
  if(user) res.send(user);
  else res.sendStatus(404);
});

module.exports = router