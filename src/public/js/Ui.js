
const appendProduct = product=>{
const list =document.getElementById('product_list')

list.innerHTML+=`
<div class="card m-3 row border-radius:10 style="width: 18rem;">
  <img src="..." class="card-img-top" alt="..." />
  <div class="card-body">
    <h5 class="card-title">${product.title}</h5>
    <p class="card-text">${product.category}</p>
    <ul class="list-group list-group-flush text-center">
      <li class="list-group-item">$ ${product.price}</li>
      <li class="list-group-item">Unidades: ${product.stock}</li>
    </ul>
    <div class="card-footer p-1">
      <p class="card-text">${product.description}</p>
    </div>
    <a href="#" class="btn btn-primary m-2">Agregar</a>
  </div>
</div>`

}

const loadProducts = products=>{
    document.getElementById('spinner').innerHTML=`
    <div class="d-flex justify-content-center">
    <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
    </div>
    </div>
    `
    setTimeout(()=>{
        products.forEach(product => {
            appendProduct(product)
        });
        document.getElementById('spinner').setAttribute('style','display:none;')
    },1500)
}

