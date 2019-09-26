import {TestBed} from '@angular/core/testing';
import {ApiService} from './api.service';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import {UserService} from '../user/user.service';
import {HttpEventType} from '@angular/common/http';


describe('ApiService', () => {
    let service: ApiService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [HttpClientTestingModule],
            providers: [ApiService]
        });

        service = TestBed.get(ApiService);
        httpMock = TestBed.get(HttpTestingController);
    });

    it('deve criar o serviço', () => {
        expect(service).toBeTruthy();
    });

    it('deve atribuir as opções do menu ao serviço', () => {
        const options = [{
            Cod_Opc: 1,
            Nom_Opc: 'Usuário',
            Nom_URLAngular: 'usuario'
        }];
        service.set(options);
        expect(service.get().length).toEqual(1);
    });

    it('deve fazer um request simples', (done: DoneFn) => {
        const url = 'mock://momentum.com.br';
        const body = { content: 'Done!' };

        service
            .http('GET', url)
            .call()
            .subscribe(res => {
                expect(res).toEqual(body);
                done();
            });

        const req = httpMock.expectOne(url);
        req.flush(body);
        httpMock.verify();
    });

    it('deve fazer um request que valida os tokens', (done: DoneFn) => {
        const options = [{
            Cod_Opc: 1,
            Nom_Opc: 'Usuário',
            Nom_URLAngular: '/'
        }];

        const url = 'mock://momentum.com.br/usuario';
        const body = { content: 'Done!' };

        service.set(options);
        UserService.setToken('mocktoken');

        const request = service.http('POST', url).call();

        request.subscribe((res) => {
            expect(res).toEqual(body);
            expect(request.headers.get('Authorization')).toBeTruthy();
            done();
        });

        const req = httpMock.expectOne(url);
        req.flush(body);
        httpMock.verify();
    });

    it('deve fazer um request puro', (done: DoneFn) => {
        const url = 'mock://momentum.com.br/usuario';
        const body = { content: 'Done!' };

        service
            .http('POST', url, { cleanResult: true })
            .call()
            .subscribe((res) => {
                switch (res.type) {
                    case HttpEventType.Response:
                        expect(res.body).toEqual(body);
                        break;
                    case HttpEventType.Sent:
                        expect(res.body).toBeUndefined();
                        break;
                }
                done();
            });

        const req = httpMock.expectOne(url);
        req.flush(body);
        httpMock.verify();
    });
});
