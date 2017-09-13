import { CacheService } from '../cache.service';
import { Injectable } from '@angular/core';
import { AppModule } from '../app.module';

@Injectable()
export class Loan{
    cacheService = AppModule.injector.get(CacheService);

    constructor(
        public id: number,
        public borrowerId: number,
        public bookId: number,
        public date: Date,
        public dueDate: Date
    ) { }
    
    static fromJson(json: any){        
        return new Loan(
            json.id,
            json.borrowerId, 
            json.bookId,
            new Date(json.date),
            new Date(json.date)
        );
    }
}