import {TestBed} from '@angular/core/testing';
import {UserService} from './user.service';

describe('UserService', () => {

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: [UserService]
        });

    });

    it('deve criar o serviço', () => {
        expect(UserService).toBeTruthy();
    });

    it('deve atribuir o usuário', () => {
        UserService.setUser({
            Nom_Apelido: 'Automático'
        });
        expect(UserService.getUser()).toBeTruthy();
    });

    it('deve atribuir o menu', () => {
        UserService.setMenu([{
            Cod_Opc: 1,
            Nom_Opc: 'Usuário',
            Nom_URLAngular: '/'
        }]);
        expect(UserService.getMenu().length).toEqual(1);
    });

    it('deve atribuir os tokens', () => {
        UserService.setToken('token-unit-test', true);
        expect(UserService.getToken()).toBeTruthy();
        expect(UserService.hasToken()).toBeTruthy();
    });

    it('deve atribuir o token do MVC', () => {
        UserService.setTokenMvc('token-unit-test');
        expect(UserService.getTokenMvc()).toBeTruthy();
    });

    it('deve resetar o serviço', () => {
        UserService.remove();
        expect(UserService.hasToken()).toBeFalsy();
    });
});
