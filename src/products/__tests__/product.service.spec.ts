import {Test, TestingModule} from '@nestjs/testing';
import {getRepositoryToken} from '@nestjs/typeorm';
import {ProductRepository} from '../repositories/product.repository';
import {ProductService} from '../services/product.service';

describe('ProductService', () => {
    let service: ProductService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({

            providers: [ProductService,
                {provide: getRepositoryToken(ProductRepository), useClass: ProductRepository}]
        }).compile();

        service = module.get<ProductService>(ProductService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });
});