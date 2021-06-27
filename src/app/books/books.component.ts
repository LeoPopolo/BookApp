import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BooksService } from '../Services/books.service';

export interface book {
  titulo: string;
  autor: string;
  edicion: number;
}

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  form = new FormGroup({
      bookTitle: new FormControl(''),
      bookAuthor: new FormControl(''),
      bookEdition: new FormControl('')
    }
  );
  bookList: Array<book>;
  creating: boolean = false;
  editing: boolean = false;
  book: book = {
    titulo: '',
    autor: '',
    edicion: 0
  };
  bookSelected: number;
  infoStatusAbm: string = '';
  showDialogInfo: boolean = false;

  constructor(
    private books: BooksService,
    private fb: FormBuilder
  ) { }

  async ngOnInit() {
    await this.getBooksList();

    this.form = this.fb.group({
      bookTitle: ['', Validators.required],
      bookAuthor: ['', Validators.required],
      bookEdition: ['', Validators.required]
    });

    this.form.setValue({
      bookTitle: '',
      bookAuthor: '',
      bookEdition: ''
    })
  }

  async getBooksList() {
    const response: any = await this.books.getBooksList();

    this.bookList = response;
  }
  
  async createBook() {

    this.book.titulo = this.form.value.bookTitle;
    this.book.autor = this.form.value.bookAuthor;
    this.book.edicion = this.form.value.bookEdition;

    const response: any = await this.books.createBook(JSON.stringify(this.book))
      .catch(err => {
        console.log(err);
      });

    if(response !== null && response !== undefined) {
      this.showDialogInfoStatus("El libro se agregó con éxito");
      await this.getBooksList();
      this.creating = false;
    } else {
      alert("Se produjo un error al crear el libro");
      this.creating = false;
    }

  }

  async deleteBook(id: number, title: string) {

    if(confirm(`¿Desea eliminar el libro ${title}?`)) {
      const response: any = await this.books.deleteBook(id)
      .catch(err => {
        console.log(err);
      });
  
      if(response !== null && response !== undefined) {
        this.showDialogInfoStatus("El libro se eliminó con éxito");
        await this.getBooksList();
      } else {
        alert("Se produjo un error al eliminar el libro");
      }
    }
  }

  async editBook(id: number) {
    let editedBook: book = {
      titulo: this.form.value.bookTitle,
      autor: this.form.value.bookAuthor,
      edicion: this.form.value.bookEdition
    }

    const response: any = await this.books.updateBook(id, JSON.stringify(editedBook))
      .catch(err => {
        console.log(err);
      });

    if(response !== null && response !== undefined) {
      this.showDialogInfoStatus("El libro se modificó con éxito");
      this.editing = false;
      this.bookSelected = -1;
      await this.getBooksList();
    } else {
      alert("Se produjo un error al modificar el libro");
      this.editing = false;
    }

  }

  async formNewBook() {
    this.creating = true;

    this.form.setValue({
      bookTitle: '',
      bookAuthor: '',
      bookEdition: ''
    })
  }

  async formEditBook(book: any) {
    this.editing = true;
    this.bookSelected = book.id;

    this.form.setValue({
      bookTitle: book.titulo,
      bookAuthor: book.autor,
      bookEdition: book.edicion
    })
  }

  async closeCards() {
    this.editing = false;
    this.creating = false;
    this.bookSelected = -1;
  }

  async showDialogInfoStatus(message: string) {
    this.infoStatusAbm = message;
    this.showDialogInfo = true;
  }
}
