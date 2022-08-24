class User {
  constructor(name, surname, books, pet) {
    (this.name = name),
      (this.surname = surname),
      (this.books = books),
      (this.pet = pet);
  }
  //Metodo
  getFullName() {
    return this.name;
  }

  countPets() {
    return this.pet.length;
  }

  addBooks(nameBook, autor) {
    this.books.push({ name: nameBook, autor: autor });
  }

  getBooksNames() {
    if (this.books.length != 0) {
      this.books.forEach((book) => {
        console.log('Nombre:', book.name);
      });
    } else {
      console.log(`El Usuario ${this.getFullName()}, No tiene Libros`);
    }
  }
}
//Instanciamos la clase
const person = new User(
  'Marcelo',
  'Rodriguez',
  [],
  ['perro', 'gato', 'pato', 'pajaro']
);

person.addBooks('El señor de los Anillos', 'Tolkien');
person.addBooks('El señor de los Anillos 2', 'Tolkien');
person.addBooks('El señor de los Anillos 3', 'Tolkien');
person.addBooks('Harry Potter', 'JK ROWLING');
console.log('Nombre de Usuario:', person.getFullName());
console.log('Numero de Mascotas:', person.countPets());
person.getBooksNames();
