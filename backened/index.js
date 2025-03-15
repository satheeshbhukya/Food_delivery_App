const mongoose=require('mongoose')
const express= require ('express')
const cors=require('cors')
const app=express()
const port=5000;
mongoose.connect( "mongodb+srv://Chandra:Chandra2020@cluster0.titzik6.mongodb.net/food_app?retryWrites=true&w=majority").then(async()=>{console.log("DB connection Established")
const FoodItem = mongoose.model('food_Items', new mongoose.Schema({
    name: String
  }));

  const FoodCateg = mongoose.model('foodCategories', new mongoose.Schema({
    Categoryname: String
  }));
 

  try {
    const fetchedData = await FoodItem.find({});
    const foodCategory=await FoodCateg.find({})

    global.food_items=fetchedData;
     global.foodCategory=foodCategory;

  } catch (err) {
    console.error('Error fetching data:', err);
  }

})

 app.use(cors({origin:"*"}))//know more about it
app.use(express.json())
app.get('/',(req,res)=>{
    res.send('Hello world')
})
app.use('/api',require("./Routes/CreateUser"))
app.use('/api',require("./Routes/DisplayData"))
app.use('/api',require("./Routes/OrderData"))

app.listen(port,()=>{
    console.log("running on port 5000")
})
