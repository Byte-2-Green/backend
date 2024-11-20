import { JSONFilePreset } from "lowdb/node";

// Read or create db.json
// defaultData specifies the structure of the database
const defaultData = { 
  meta: {
    "title": "List of food for thought",
    "date": "November 2024"
  }, 
  foodForThought: [] 
};
const db = await JSONFilePreset('db.json', defaultData);
const foodForThought = db.data.foodForThought;

export async function responseFoodForThought(req, res) {
  res.status(200).send(foodForThought);
}

export async function updateFoodForThought(req, res) {
  // fixme check if id exists
  let id = req.query.id;
  let thought = req.query.thought;
  let category = req.query.category;
  let time = new Date().toLocaleString();
  let food = {id: id, thought: thought, category: category, time: time};  
  // todo remove log
  console.log(food);
  foodForThought.push(food);
  await db.write();

  res.status(201).send(`I added this thought: ${JSON.stringify(food)}?`);
}

export async function responseByIdFoodForThought(req, res) {
  let id = req.params.id;
  let food = foodForThought.find(food => food.id === id);
  if (food) {
    res.status(200).send(food);
  } else {
    res.status(404).send('Food for thought not found');
  }
}

export async function responseByCategoryExample(req, res) {
  let category = req.params.category;
  let filtered = foodForThought.filter(food => food.category.toLowerCase() === category.toLowerCase());
  if (filtered.length > 0) {
    res.status(200).send(filtered);
  } else {
    res.status(404).send('No food for thought found in this category');
  }
}