import { CacheService } from '../cache.service';
import { Injectable } from '@angular/core';
import { AppModule } from '../app.module';

@Injectable()
export class Borrower{
    cacheService = AppModule.injector.get(CacheService);

    constructor(
        public id: number,
        public name: string,
        public surname: string,
        public location: string
    ) { }
    
    static fromJson(json: any){        
        return new Borrower(
            json.id, 
            json.name,
            json.surname,
            json.location
        );
    }
}