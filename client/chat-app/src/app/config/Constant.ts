import { Injectable } from '@angular/core';

@Injectable()
export class Constants {

    public static get sharedAppImport(): string { return  '/shared/upload'; }

}
