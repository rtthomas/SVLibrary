import { CacheService } from '../cache.service';
import { Injectable } from '@angular/core';
import { AppModule } from '../app.module';

@Injectable()
export class Catalog{
    cacheService = AppModule.injector.get(CacheService);

    // The id value is the catalog prefix. This supports common handling of objects
    // in the cache service
    constructor(
        public id: string,
        public language: string
    ) { }
    
    static fromJson(json: any){
        return new Catalog(
            json.id, 
            json.language 
        );
    }
}
