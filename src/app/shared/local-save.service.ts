import { Injectable } from '@angular/core';
import { Cliente } from './models/cliente.model';
import { Oficina } from './models/oficina.model';
import { Gestor } from './models/gestor.model';


@Injectable()
export class LocalSaveService {

    constructor() {}

    logOut(): void {
        localStorage.clear();
        sessionStorage.clear();
    }
    setUsuarioLogado(tipo: any): void {
        window.localStorage.setItem('usuarioLogado', JSON.stringify(tipo));
    }
    getUsuarioLogado(): any {
       return (JSON.parse(window.localStorage.getItem('usuarioLogado')) as any);
    }
    setOficinaToEdit(oficina: Oficina): void {
        window.localStorage.setItem('oficinaToEdit', JSON.stringify(oficina));
    }
    getOficinaToEdit(): Oficina {
       return (JSON.parse(window.localStorage.getItem('oficinaToEdit')) as Oficina);
    }
    setToken(token: string): void {
        window.localStorage.setItem('oficinaToEdit', token);
    }
    getToken(): string {
       return (window.localStorage.getItem('oficinaToEdit'));
    }
    // setClienteToEdit(cliente: Cliente): void {
    //     window.localStorage.setItem('clienteToEdit', JSON.stringify(cliente));
    // }
    // getClienteToEdit(): Cliente {
    //    return (JSON.parse(window.localStorage.getItem('clienteToEdit')) as Cliente);
    // }
    // setGestorToEdit(gestor: Gestor): void {
    //     window.localStorage.setItem('gestorToEdit', JSON.stringify(gestor));
    // }
    // getGestorToEdit(): Gestor {
    //    return (JSON.parse(window.localStorage.getItem('gestorToEdit')) as Gestor);
    // }
}
