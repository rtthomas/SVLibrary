import { CacheService } from '../cache.service';
import { Injectable } from '@angular/core';
import { AppModule } from '../app.module';

@Injectable()
export class Book{
    cacheService = AppModule.injector.get(CacheService);

    constructor(
        public id: number,
        public number: string,
        public catalogId: string,
        public coverArtId: number,
        public removed: boolean
    ) { }
    
    static fromJson(json: any){
        
        return new Book(
            json.id,
            json.number,
            json.catalogId, 
            json.coverArtId,
            json.removed
        );
    }
}