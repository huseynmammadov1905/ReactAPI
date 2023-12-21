const { useState, useEffect } = require("react");




function FormComponent(){
    const [goods,setGoods] = useState([]);
    const [obj,setObj] = useState({
        product_name : "",
        product_description:"",
        product_price:0,
    });
    const [flag, setFlag] = useState(false);

    useEffect(()=>{
      
        fetch('http://localhost:5005/goods')
        .then((res)=> res.json())
        .then((data)=> setGoods(data))
    },[flag])

    const addProduct = ()=>{
       fetch('http://localhost:5005/add-goods',{
        method:"POST",
        headers:{
            "Content-Type":'application/json',
        },
        body:JSON.stringify(obj)
       })
       .then((res)=> res.text()) 
       .then(()=>{
        setFlag(!flag)
       })
    }
    

    const deleteProduct = (item) => {
          fetch(`http://localhost:5005/delete-goods/${item.id}`, {
            method: "DELETE",
          })
            .then((res) => res.text())
      };


      const searchGoods=(s)=>{
        fetch(`http://localhost:5005/search-goods/${s}`)
        .then((res) => res.json())
        .then((data) => setGoods(data))
      }


    return(

        <div>
            
            <div>
                <input type="text" onChange={(ev)=> setObj({...obj,product_name: ev.target.value})}/>
                <input type="text" onChange={(ev)=> setObj({...obj,product_description: ev.target.value})}/>
                <input type="number" onChange={(ev)=> setObj({...obj,product_price: ev.target.value})}/>
                <button onClick={()=>{
                    addProduct();
                }}>ADD</button>

                <br/>
                <input onChange={(e)=>{
                    e.target.value === ''?setFlag(!flag):searchGoods(e.target.value);
                }}  placeholder="search"/>
            </div>

            <ul style={{listStyle:'none'}}>
                {goods.map((item,index)=>{
                    return(
                        <li key={index}>
                             {item.id}.{item.product_name} {item.product_description}  {item.product_price}
                             <button
                            onClick={() => {
                                deleteProduct(item);
                                setFlag(!flag);
                  }}
                >
                  DELETE
                </button>
                        </li>
                    )
                })}
            </ul>
           
        </div>
    )

}

export default FormComponent