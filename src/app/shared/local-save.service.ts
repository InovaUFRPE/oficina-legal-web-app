import { Injectable } from '@angular/core';
import { Cliente } from './models/cliente.model';


@Injectable()
export class LocalSaveService {

    constructor() {}

    clean(): void {
        localStorage.clear();
        sessionStorage.clear();
    }

    setClienteToEdit(cliente: Cliente): void {
        window.localStorage.setItem('clienteToEdit', JSON.stringify(cliente));
    }
    getClienteToEdit(): Cliente {
       return (JSON.parse(window.localStorage.getItem('clienteToEdit')) as Cliente);
    }
}
