import { join } from 'path';
import { LocalStorage } from 'node-localstorage';
import { __dirname } from '../dirname.js';
const localStorage = new LocalStorage(join(__dirname,'cart'));

const CART_NAME = 'cart_Test'
const CART_ID = 'cart_Test_ID'


class CartManager  {
    //Método statico para crear un Id de carrito por sesion de Usuario
    //anotacion que es representada por caracteres 0-9 // a-z
    static id = Date.now().toString(35) + Math.random().toString(32).slice(2);
    constructor()
    {
        this.items = this.setItems() ? this.setItems() : []
        this.quantity = this.setQuantity() ? this.setQuantity() : 0


 
    }
//ADD
addItem({id}){
        if(this.items.find(item=>item.product == id))
        { 
            console.log('encontre id')
            this.items.find(item=>item.product == id).quantity += 1
        }  
        else
            this.items.push({product:id,quantity:1})
 
}
//GETTERS
getCart(cid){
    const {cart,id} = localStorage.getItem(CART_NAME) ? JSON.parse(localStorage.getItem(CART_NAME)) : [];
    console.log(id)
    //Si tengo una coincidencia en ID de carro devuelvo Aunque el carro este vacio, para ingresar primer producto
    return id == cid && cart.length>0? cart : id

     
    
}

getIdCart(){
    return this.id
}
getItem(id){
    console.log('busco entre...',this.items)
    return this.items.find(item => item.id == id);
}

getCartQ(){
    return this.quantity
}
//SETTERS
setID(){
    console.log(this.quantity)
    if (this.quantity==0)
    {
        localStorage.setItem(CART_ID,CartManager.id)
        return CartManager.id
    }
    else
        return localStorage.getItem(CART_ID)

}
setItems(){
    let storage = localStorage.getItem(CART_NAME) ? JSON.parse(localStorage.getItem(CART_NAME)) : [];
    console.log('STRGE', storage)
    return  storage?.cart? storage.cart : []
}
setQuantity(){
    return this.items.length 
}

//DEL
delCart(){
    this.items = []
}

delItem(id){
    this.items=this.getCart().filter(item => item.id != id);
    this.storeCart(CART_NAME,this.items)
}
//STORE
storeCart(){
    console.log('voy a guardar',this.items)
    localStorage.setItem(CART_NAME,JSON.stringify({id:CartManager.id,cart:this.items}))
}


}

export default CartManager;