import {throwError} from 'rxjs';
import {HttpEventType} from '@angular/common/http';
import {UiSnackbar} from 'ng-smn-ui';

export class ApiResponse {

    static extractData(res, callback, cleanResult) {
        if (!callback) {
            return;
        }

        if (cleanResult) {
            callback(res);
        }

        if (res.type === HttpEventType.Response && !cleanResult) {
            callback(res.body);
        }
    }

    static handleError(res, callback, cleanError) {
        if (callback) {
            callback(res);
        }

        if (cleanError) {
            return throwError(res);
        }

        if (res.status !== 500 && res.error && res.error.messages && res.error.messages.content && res.error.messages.content.length) {
            res.error.messages.content.forEach(error => {
                UiSnackbar.show({
                    text: error,
                    actionText: 'OK',
                    action: close => close(),
                    duration: 5000
                });
            });

            return throwError(res);
        }

        switch (res.status) {
            case 0:
                UiSnackbar.show({
                    center: true,
                    text: `Um de nossos serviços está fora do ar e não foi possível processar sua requisição. Tente novamente mais tarde.`,
                    actionText: 'OK',
                    action: close => close(),
                    duration: 5000
                });
                break;
            case 400:
                if (!cleanError) {
                    UiSnackbar.show({
                        center: true,
                        text: `Requisição inválida. Verifique as informações fornecidas.`,
                        actionText: 'OK',
                        action: close => close()
                    });
                }
                break;
            case 409:
                if (!cleanError) {
                    const messages = res.error.messages.content || [];

                    messages.forEach(message => {
                        UiSnackbar.show({
                            center: true,
                            text: message,
                            actionText: 'OK',
                            action: close => close()
                        });
                    });

                }
                break;
            case 500:
                UiSnackbar.show({
                    center: true,
                    text: `Ocorreu um erro interno. Já fomos informados do erro. Tente novamente mais tarde.`,
                    actionText: 'OK',
                    action: close => close(),
                });
        }

        return throwError(res);
    }

}
