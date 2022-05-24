/*
let detailsProductDto: ProductDetailsDto = new Builder(ProductDetailsDto)
    .with({id: 57})
    .with({reference: "headphones"})
    .with({catalogReference: "sound products"})
    .with({productName: "Sony Rockstar"})
    .with({description: "Average size heaphones with soft texture"})
    .with({keywords: "Sony phones audio sound music"})
    .with({size: "average"})
    .with({color: "blue"})
    .with({mainImage: "jdghfdghfdjhgdkhdfgdhfgjdhgjghjnk",})
    .with({brand: "Sony"})
    .with({price: 50})
    .with({subCategory: })
    .build();

describe('ProductController', () => {
    let productController: ProductController;
    let productService: ProductService;
    let productRepository: ProductRepository;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductController],
            providers: [
                ProductService,
                {provide: getRepositoryToken(ProductRepository), useClass: ProductRepository}
            ],
        }).compile();


        productController = module.get<ProductController>(ProductController);
        productService = module.get<ProductService>(ProductService);
        productRepository = module.get<ProductRepository>(getRepositoryToken(ProductRepository))
    });

    describe('findAllSuccess', () => {
        it('should return an array of products', async () => {
            //mocks
            jest.spyOn(productService, 'findAll').mockResolvedValue(productMocks.getMockedProductDetailsDtoList());

            expect(await productController.findAll()).toStrictEqual(await productMocks.getMockedProductDetailsDtoList());
        });
    });

    describe('findOneSuccess',()=>{
        it('should return a product', async () => {
            //mocks
            jest.spyOn(productService, 'findOne').mockResolvedValue(productMocks.getMockedProductDetailsDto());

            expect(await productController.findOne(1)).toStrictEqual(await productMocks.getMockedProductDetailsDto());
        })
    })

    describe('updateSuccess',()=>{
        it('should update a product', async () => {
            //mocks
            jest.spyOn(productService, 'update').mockResolvedValue(productMocks.getMockedUpdatedProductDetailsDto(detailsProductDto));

            expect(await productController.update(1, null)).toStrictEqual(await productMocks.getMockedUpdatedProductDetailsDto(detailsProductDto));
        })
    })

    describe('createSuccess',()=>{
        it('should create a product', async () => {
            //mocks
            jest.spyOn(productService, 'create').mockResolvedValue(productMocks.getMockedProductDetailsDto());

            expect(await productController.create(productMocks.getMockedProductDetailsDto())).toStrictEqual(await productMocks.getMockedProductDetailsDto());
        })
    })

    describe('createFailureDueToUserAlreadyExists', () => {
        it('', async () => {
            jest.spyOn(productService, 'create').mockRejectedValue(new HttpException("Error: unable to save from database!", HttpStatus.INTERNAL_SERVER_ERROR));
            const create = async () => await productController.create(productMocks.getMockedProductDetailsDto());
            await expect(create()).rejects.toThrow(HttpException);
          });
    });

   describe('findAllFailureDueToThereAreNoProducts', () => {
        it('', async () => {
            jest.spyOn(productService, 'findAll').mockRejectedValue(new HttpException("Could not find any products!", HttpStatus.INTERNAL_SERVER_ERROR));
            const findAll = async () => await productController.findAll();
            await expect(findAll()).rejects.toThrow(HttpException);
          });
    });

    describe('findOneFailureDueToThereIsNoProduct', () => {
        it('', async () => {

            let num : number = 4;

            if (num <= 0 || !num) {
                jest.spyOn(productService, 'findOne').mockRejectedValue(new HttpException("Could not find the given product!", HttpStatus.INTERNAL_SERVER_ERROR));
            }
            else {
                jest.spyOn(productService, 'findOne').mockRejectedValue(num);
            }

            const findOne = async () => await productController.findOne(num);
            await expect(findOne()).rejects.toThrow(HttpException);
          });
    });
})
*/