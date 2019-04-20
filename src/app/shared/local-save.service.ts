import { Injectable } from '@angular/core';
import { Cliente } from './models/cliente.model';
import { Oficina } from './models/oficina.model';


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
    setOficinaToEdit(oficina: Oficina): void {
        window.localStorage.setItem('oficinaToEdit', JSON.stringify(oficina));
    }
    getOficinaToEdit(): Oficina {
       return (JSON.parse(window.localStorage.getItem('oficinaToEdit')) as Oficina);
    }
}
