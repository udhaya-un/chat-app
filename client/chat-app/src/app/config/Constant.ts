import { Injectable } from '@angular/core';

@Injectable()
export class Constants {

    public static get apiBaseUrl(): string { return  'http://localhost:3005/api'; }

}
