# ENTREGA FINAL

## ---Curso Backend --- Carrera FullStack

## EndPoints de PRUEBA
### **Todos los productos BD con query --GET--**
http://localhost:8080/api/products/?limit=30&page=2&asc=true

### **Obtiene un producto por ID --GET--**
http://localhost:8080/api/products/666f532da126f89bca200e7e2

### **Crear Carrito Vacio --GET--**
http://localhost:8080/api/cart/

### **Todos los productos del carrito --GET--**
http://localhost:8080/api/cart/667594342ba73387ca174c83

### **Agrega un producto nuevo --POST--**
http://localhost:8080/api/products

### **Agregar Producto al Carrito --POST--**
http://localhost:8080/api/cart/667594342ba73387ca174c83/products/6673201e0c317b0a03a441f3

### **Modifica un Producto en la BD por ID --PUT--**
http://localhost:8080/api/products/667882436178a58ea9abade9

### **Modifica Determinado Producto --PUT--**
http://localhost:8080/api/products/666f532da126f89bca200e7b

### **Modificar la cantidad de un Producto --PUT--**
http://localhost:8080/api/cart/667594342ba73387ca174c83/products/666f532da126f89bca200e7e

### **Vaciar el Carro --DEL--**
http://localhost:8080/api/cart/667594342ba73387ca174c83/empty

### **Eliminar el Carro --DEL--**
http://localhost:8080/api/cart/6675a17d92e188b9f4641f5f

### **Eliminar producto del Carro --DEL--**
http://localhost:8080/api/cart/667596b266cdd9c03f402153/products/666f532da126f89bca200e78

### **Borrar un Producto por ID en la BD --DEL--**
http://localhost:8080/api/products/66787b6d7139d35cd73d7577
