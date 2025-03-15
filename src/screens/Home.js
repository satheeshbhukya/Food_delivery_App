import React ,{useState,useEffect} from "react";
import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer";

function Home() {
  const [foodCat,setFoodCat]=useState([])
  const [foodItem,setFoodItem]=useState([])
  const [search,setSearch]=useState("")
  const loadData=async ()=>{
    let response=await fetch("http://localhost:5000/api/foodData",{
      method:"POST",
      headers:{
        'Content-Type':'application/json'
      }
    })
 response=await response.json();
  console.log(response[0],response[1])
  setFoodItem(response[0]);
  setFoodCat(response[1]);
  }
  useEffect(()=>{
     loadData()
  },[])
  return (
    <div>
      <div>
        <Navbar />
      </div>
      <div>
      <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{ objectFit: "contain !important" }}>
  <div className="carousel-inner" id='carousel'>
    <div className="carousel-caption" style={{ zIndex: "10" }}>
      <div className="d-flex justify-content-center">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => { setSearch(e.target.value) }} />
        <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button>
      </div>
    </div>
    <div className="carousel-item active">
      <img src="https://www.foodandwine.com/thmb/DI29Houjc_ccAtFKly0BbVsusHc=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/crispy-comte-cheesburgers-FT-RECIPE0921-6166c6552b7148e8a8561f7765ddf20b.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://imagevars.gulfnews.com/2023/05/01/Tandoori-chicken_187d79b132b_large.jpg" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
    </div>
    <div className="carousel-item">
      <img src="https://media.istockphoto.com/id/1345624336/photo/chicken-biriyani.jpg?s=612x612&w=0&k=20&c=adU_N0P-1SKMQLZu5yu7aPknfLLgbViI8XILqLP92A4=" className="d-block w-100" style={{ filter: "brightness(30%)" }} alt="..." />
    </div>
  </div>
  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Previous</span>
  </button>
  <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
    <span className="carousel-control-next-icon" aria-hidden="true"></span>
    <span className="visually-hidden">Next</span>
  </button>
</div>

      </div>
     <div className="container">
        {
            foodCat.length ?foodCat.map((data)=>{
              return (<div className="row mb-3">
                <div key={data._id} className="fs-3 m-3">{data.CategoryName} </div>
                <hr/>
                {
                  foodItem.length?foodItem.filter((item)=>((item.CategoryName===data.CategoryName) &(item.name.toLowerCase().includes(search.toLocaleLowerCase())) )).map(filterItems=>{
                    return(<div key={filterItems._id} className="col-12 col-md-6 col-lg-3">
                        <Card foodItem={filterItems} options={filterItems.options[0]} ></Card>      
                    </div>)
                  }):<div>"No items"</div>
                }
              </div>)
            }):<div>"hell"</div>
        }
       
     </div>
     <div>
        <Footer/>
     </div>
    </div>
  );
}

export default Home;
