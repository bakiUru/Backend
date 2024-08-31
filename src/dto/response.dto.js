
const resProduct = (product) =>{
    return {
        id: product.id,
        name: product.title,
        price: product.price,
        stock: product.stock,
        description: product.description
        }

}

const resUsuario = (user) =>{
    return {
        id: user.id,
        name: user.name,
        email: user.email
        }
}

const resTicket = (ticket)=>{
    return {
        code: ticket.code,
        amount: ticket.amount,
        purcharser: ticket.purcharser,
        date: ticket.puschase_time
    }
}


export default{
    resProduct,
    resUsuario,
    resTicket
}