/*alert("Hello");*/
let title = document.getElementById('title');
let price = document.getElementById('price');
let tax = document.getElementById('tax');
let ads = document.getElementById('ads');
let discount = document.getElementById('discount');
let total = document.getElementById('total');
let count = document.getElementById('count');
let category = document.getElementById('category');
let submit = document.getElementById('submit');


let mood ='create';
let tmp;

 //console.log(title,price,tax,ads,discount,total,count,category,submit)

 //get total
 function getTotal()
 {
//console.log('done');
 if(price.value !='')
 {
    let result= (+price.value + +tax.value + +ads.value ) - discount.value ;
 total.innerHTML = result
 total.style.background = '#040';
   }
   else
   {
      total.innerHTML='';
   total.style.background = '#a00d02';
   }
 }
//creat product
let dataPro;

if(localStorage.product != null){
   dataPro = JSON.parse(localStorage.product)
}
else{
   dataPro = [];
}

submit.onclick = function(){
   let newPro = {
      title:title.value,
      price:price.value,
      tax:tax.value,
      ads:ads.value,
      discount:discount.value,
      total:total.innerHTML,
      count:count.value,
      category:category.value,

   }


if(mood ==='create'){
   if( newPro.count > 1)
{
   for( let i = 0 ; i<newPro.count ; i++)
   {dataPro.push(newPro);}

} else{
dataPro.push(newPro);
}
}

else
{
   dataPro[ tmp ]= newPro;
   mood='create';
   submit.innerHTML='create';
   count.style.display ='block';
}
    
   //save data in local storage
   
   localStorage.setItem("product",JSON.stringify(dataPro));
   clearData()
   showData()
   console.log(dataPro)
}

//clear input
function clearData() {
   title.value = '';
   price.value = '';
   tax.value = '';
   ads.value = '';
   discount.value = '';
   total.value = '';
   count.value = '';
   category.value = '';
   total.innerHTML = '';

}

//read
function showData(){

   let table = '';
   for(let i = 0 ; i< dataPro.length; i++)
   {
      table += `
      <tr>
         <td>${i}</td>
         <td>${dataPro[i].title}</td>
         <td>${dataPro[i].price}</td>
         <td>${dataPro[i].tax}</td>
         <td>${dataPro[i].ads}</td>
         <td>${dataPro[i].discount}</td>
         <td>${dataPro[i].total}</td>
         <td>${dataPro[i].category}</td>
        
        <td><button onclick="updateData( ${i} )" id="Update" >Update</button></td>
        <td><button onclick="deleteData(  ${i}  )" id="Delete">Delete</button></td>
        
      </tr>  ` ;

}
      document.getElementById('tbody').innerHTML = table;

      let btnDelete = document.getElementById('deleteAll');
      if( dataPro.length > 0)
      {
         btnDelete.innerHTML = `
         <button onclick="deleteAll()">Delete All( ${dataPro.length} )</button>
         `
      }else{
         btnDelete.innerHTML = ``; 
      }

}
showData()

//count
//delete
function deleteData(i){
 dataPro.splice(i,1);
 localStorage.product = JSON.stringify(dataPro);
 showData()
}

function deleteAll()
{
 localStorage.clear()
 dataPro.splice(0)
 showData()

}
//count

//update
function updateData(i){
   title.value = dataPro[i].title;
   price.value = dataPro[i].price;
   tax.value = dataPro[i].tax;
   ads.value = dataPro[i].ads;
   discount.value = dataPro[i].discount;
   count.style.display = 'none';
   getTotal();
   category.value = dataPro[i].category;
   submit.innerHTML = 'Update';
  
   mood ='update';
   tmp =i;

   scroll({
      top:0,
      behavior:'smooth',
   })
}

//search
let searchMood = 'title';

function getsearchMood(id){

//console.log(id)
let search = document.getElementById('search');

if (id=='searchTitle')
{
   searchMood = 'title';
   search.placeholder = 'Search by title';
}else{
   searchMood = 'category';
   search.placeholder = 'Search by category';

}
search.focus()

}



function searchData(value){
let table= '';
if (searchMood == 'title')
{
 for( let i=0 ; i< dataPro.length ; i++)
{
   if(dataPro[i].title.includes(value))
   {
      table += `
      <tr>
         <td>${i}</td>
         <td>${dataPro[i].title}</td>
         <td>${dataPro[i].price}</td>
         <td>${dataPro[i].tax}</td>
         <td>${dataPro[i].ads}</td>
         <td>${dataPro[i].discount}</td>
         <td>${dataPro[i].total}</td>
         <td>${dataPro[i].category}</td>
        
        <td><button onclick="updateData( ${i} )" id="Update" >Update</button></td>
        <td><button onclick="deleteData(  ${i}  )" id="Delete">Delete</button></td>
        
      </tr>  ` ;
   }

}

}
else{
   for( let i=0 ; i< dataPro.length ; i++)
   {
      if(dataPro[i].category.includes(value))
      {
         table += `
         <tr>
            <td>${i}</td>
            <td>${dataPro[i].title}</td>
            <td>${dataPro[i].price}</td>
            <td>${dataPro[i].tax}</td>
            <td>${dataPro[i].ads}</td>
            <td>${dataPro[i].discount}</td>
            <td>${dataPro[i].total}</td>
            <td>${dataPro[i].category}</td>
           
           <td><button onclick="updateData( ${i} )" id="Update" >Update</button></td>
           <td><button onclick="deleteData(  ${i}  )" id="Delete">Delete</button></td>
           
         </tr>  ` ;
      }
}
document.getElementById('tbody').innerHTML = table;



}
}







