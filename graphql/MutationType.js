const graphql = require('graphql');
const mongoose = require('mongoose');

const Adherent = require('./models/adherent');
const AdherentType = require('./types/AdherentType');

const Bill = require('./models/bill/bill');
const BillType = require('./types/bill/BillType');
const LineBill = require('./models/bill/linebill');
const LineBillInputType = require('./types/bill/linebill/LineBillInputType');

const CashFund = require('./models/cashfund');
const CashFundType = require('./types/CashFundType');

const Offer = require('./models/offer/offer');
const OfferType = require('./types/offer/OfferType');
const ProductOffer = require('./models/offer/productoffer');
const ProductOfferInputType = require('./types/offer/productoffer/ProductOfferInputType');

const Price = require('./models/price');
const PriceType = require('./types/PriceType');

const Product = require('./models/product');
const ProductType = require('./types/ProductType');

const Provider = require('./models/provider');
const ProviderType = require('./types/ProviderType');

const Reduction = require('./models/reduction');
const ReductionType = require('./types/ReductionType');

const Settings = require('./models/settings');
const SettingsType = require('./types/SettingsType');

const SlipCoins = require('./models/slip/slipcoins');
const SlipCoinsType = require('./types/slip/SlipCoinsType');
const SlipTicket = require('./models/slip/slipticket');
const SlipTicketType = require('./types/slip/SlipTicketType');

const Training = require('./models/training');
const TrainingType = require('./types/TrainingType');


const {
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLList,
    GraphQLString,
    GraphQLFloat,
    GraphQLBoolean,
    GraphQLInt,
    GraphQLID
} = graphql;

const MutationType = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        /**
         * 
         * 
         * Mutation adherent
         * 
         * 
         */
        addAdherent: {
            type: AdherentType,
            args: {
                card: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLID) },
                training: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                let adherent = new Adherent({
                    _id: mongoose.Types.ObjectId(),
                    card: args.card,
                    name: args.name,
                    firstName: args.firstName,
                    link_photo: args.card + ".png",
                    email: args.email,
                    price: args.price,
                    training: args.training,
                    active: false,
                    member: false,
                    code: null,
                    secret_code: null,
                    administrator: false,
                    superAdministrator: false
                })
                return adherent.save()
            }
        },
        updateCardAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                card: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                if (args.card != "") {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "card": args.card } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateNameAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                if (args.name != "") {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "name": args.name } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateFirstNameAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                firstName: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                if (args.firstName != "") {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "firstName": args.firstName } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateLink_photoAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                link_photo: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                if (args.link_photo != "") {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "link_photo": args.link_photo + ".png" } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateEmailAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                if (args.email != "") {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "email": args.email } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updatePriceAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                if (args.price != "") {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "price": args.price } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateTrainingAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                training: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve(parent, args) {
                if (args.training != "") {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "training": args.training } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateActiveAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                active: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                if (args.active != null) {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "active": args.active } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateMemberAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                member: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                if (args.member != null) {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "member": args.member } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateCodeAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                code: { type: GraphQLInt }
            },
            resolve(parent, args) {
                if (args.code != null) {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "code": args.code } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateSecret_codeAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                secret_code: { type: GraphQLInt }
            },
            resolve(parent, args) {
                if (args.secret_code != null) {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "secret_code": args.secret_code } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateAdministratorAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                administrator: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                if (args.administrator != null) {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "administrator": args.administrator } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        updateSuperAdministratorAdherent: {
            type: AdherentType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                superAdministrator: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                if (args.superAdministrator != null) {
                    return Adherent.findByIdAndUpdate(args._id, { $set: { "superAdministrator": args.superAdministrator } }, { new: true, useFindAndModify: false });
                } else {
                    return Adherent.findById(args._id);
                }
            }
        },
        /**
         * 
         * 
         * Mutation bill
         * 
         * 
         */
        addBill: {
            type: BillType,
            args: {
                member: { type: new GraphQLNonNull(GraphQLID) },
                provider: { type: new GraphQLNonNull(GraphQLID) },
                products: { type: new GraphQLNonNull(new GraphQLList(LineBillInputType)) },
            },
            resolve(parent, args) {
                const productArray = JSON.parse(JSON.stringify(args.products));
                var price_tot = 0;
                var i = 0;
                var linebill_id = [];
                while (i < productArray.length) {
                    var price_line = productArray[i].price_unit * productArray[i].quantity + (productArray[i].price_unit * productArray[i].quantity) * productArray[i].tva / 100;
                    let lineBill = new LineBill({
                        _id: mongoose.Types.ObjectId(),
                        product: productArray[i].product,
                        quantity: productArray[i].quantity,
                        price_unit: productArray[i].price_unit,
                        tva: productArray[i].tva,
                        price_line: price_line
                    })
                    lineBill.save();
                    linebill_id.push(lineBill._id);
                    price_tot += price_line;
                    i++;
                }
                let today = new Date();
                let date = parseInt(today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();
                price_tot = Number.parseFloat(price_tot).toFixed(2);
                let bill = new Bill({
                    _id: mongoose.Types.ObjectId(),
                    member: args.member,
                    date: date,
                    provider: args.provider,
                    products: linebill_id,
                    price_tot: price_tot
                });
                return bill.save()
            }
        },
        /**
         * 
         * 
         * Mutation cashfund
         * 
         * 
         */
        addCashFund: {
            type: CashFundType,
            args: {
                member: { type: new GraphQLNonNull(GraphQLID) },
                fifty: { type: new GraphQLNonNull(GraphQLInt) },
                twenty: { type: new GraphQLNonNull(GraphQLInt) },
                ten: { type: new GraphQLNonNull(GraphQLInt) },
                five: { type: new GraphQLNonNull(GraphQLInt) },
                two: { type: new GraphQLNonNull(GraphQLInt) },
                one: { type: new GraphQLNonNull(GraphQLInt) },
                fiftycents: { type: new GraphQLNonNull(GraphQLInt) },
                twentycents: { type: new GraphQLNonNull(GraphQLInt) },
                tencents: { type: new GraphQLNonNull(GraphQLInt) },
                fivecents: { type: new GraphQLNonNull(GraphQLInt) },
                twocents: { type: new GraphQLNonNull(GraphQLInt) },
                onecents: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                var sum = args.fifty * 50 + args.twenty * 20 + args.ten * 10 + args.five * 5 + args.two * 2 + args.one * 1 + args.fiftycents * 0.5 + args.twentycents * 0.2 +
                    args.tencents * 0.1 + args.fivecents * 0.05 + args.twocents * 0.02 + args.onecents * 0.01;
                sum = Number.parseFloat(sum).toFixed(2);
                let today = new Date();
                let date = parseInt(today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();
                let cashfund = new CashFund({
                    _id: mongoose.Types.ObjectId(),
                    date: date,
                    member: args.member,
                    sum: sum,
                    fifty: args.fifty,
                    twenty: args.twenty,
                    ten: args.ten,
                    five: args.five,
                    two: args.two,
                    one: args.one,
                    fiftycents: args.fiftycents,
                    twentycents: args.twentycents,
                    tencents: args.tencents,
                    fivecents: args.fivecents,
                    twocents: args.twocents,
                    onecents: args.onecents
                })
                return cashfund.save()
            }
        },
        /**
         * 
         * 
         * Mutation offer
         * 
         * 
         */
        addOffer: {
            type: OfferType,
            args: {
                name: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "Correspond au nom de l'offre."
                },
                active: {
                    type: new GraphQLNonNull(GraphQLBoolean),
                    description: "Si vrai, l'offre est active."
                },
                price: {
                    type: new GraphQLNonNull(GraphQLFloat),
                    description: "Correspond au prix de l'offre."
                },
                products: {
                    type: new GraphQLNonNull(new GraphQLList(ProductOfferInputType)),
                    description: "Liste contenant les identifiants des produits qui concerne l'offre.",
                },
                daily: {
                    type: new GraphQLNonNull(GraphQLBoolean),
                    description: "daily = quotidien donc si vrai, c'est une offre qui se fait par rapport à l'heure."
                },
                members_exclusivity: {
                    type: new GraphQLNonNull(GraphQLBoolean),
                    description: "Si vrai, c'est une offre exclusive aux adhérents."
                },
                startOffer: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "Correspond à la date/à l'heure de début de l'offre."
                },
                endOffer: {
                    type: new GraphQLNonNull(GraphQLString),
                    description: "Correspond à la date/à l'heure de fin de l'offre."
                }
            },
            resolve(parent, args) {
                const productArray = JSON.parse(JSON.stringify(args.products));
                var i = 0;
                var productoffer_id = [];
                while (i < productArray.length) {
                    let productoffer = new ProductOffer({
                        _id: mongoose.Types.ObjectId(),
                        product: productArray[i].product,
                        quantity: productArray[i].quantity
                    })
                    productoffer.save();
                    productoffer_id.push(productoffer._id);
                    i++;
                }
                let offer = new Offer({
                    _id: mongoose.Types.ObjectId(),
                    name: args.name,
                    active: args.active,
                    price: args.price,
                    products: productoffer_id,
                    daily: args.daily,
                    members_exclusivity: args.members_exclusivity,
                    startOffer: args.startOffer,
                    endOffer: args.endOffer
                })
                return offer.save()
            }
        },
        updateNameOffer: {
            type: OfferType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Offer.findByIdAndUpdate(args._id, { $set: { "name": args.name } }, { new: true, useFindAndModify: false });
            }
        },
        updateActiveOffer: {
            type: OfferType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                active: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                return Offer.findByIdAndUpdate(args._id, { $set: { "active": args.active } }, { new: true, useFindAndModify: false });
            }
        },
        addProductsOffer: {
            type: OfferType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                products: { type: new GraphQLNonNull(new GraphQLList(ProductOfferInputType)) }
            },
            resolve(parent, args) {
                const productArray = JSON.parse(JSON.stringify(args.products));
                var i = 0;
                var productmap_id = [];
                while (i < productArray.length) {
                    let productmap = new ProductMap({
                        _id: mongoose.Types.ObjectId(),
                        product: productArray[i].product,
                        quantity: productArray[i].quantity
                    })
                    productmap.save();
                    productmap_id.push(productmap._id);
                    i++;
                }
                return Offer.findByIdAndUpdate(args._id, { $push: { "products": productmap_id } }, { new: true, useFindAndModify: false });
            }
        },
        removeProductsOffer: {
            type: OfferType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                products: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
            },
            resolve(parent, args) {
                const productArray = JSON.parse(JSON.stringify(args.products));
                console.log(productArray)
                var i = 0;
                while (i < productArray.length) {
                    ProductMap.findByIdAndDelete(productArray[i]);
                    i++;
                }
                return Offer.findByIdAndUpdate(args._id, { $pullAll: { "products": args.products } }, { new: true, useFindAndModify: false });
            }
        },
        /**
         * 
         * 
         * Mutation price
         * 
         * 
         */
        addPrice: {
            type: PriceType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLFloat) },
                active: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                let price = new Price({
                    _id: mongoose.Types.ObjectId(),
                    name: args.name,
                    price: args.price,
                    active: args.active
                })
                return price.save()
            }
        },
        updateNamePrice: {
            type: PriceType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Price.findByIdAndUpdate(args._id, { $set: { "name": args.name } }, { new: true, useFindAndModify: false });
            }
        },
        updatePricePrice: {
            type: PriceType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                price: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parent, args) {
                return Price.findByIdAndUpdate(args._id, { $set: { "price": args.price } }, { new: true, useFindAndModify: false });
            }
        },
        updateActivePrice: {
            type: PriceType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                active: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                return Price.findByIdAndUpdate(args._id, { $set: { "active": args.active } }, { new: true, useFindAndModify: false });
            }
        },
        removePrice: {
            type: PriceType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Price.findByIdAndRemove({ _id: args._id });
            }
        },
        /**
         * 
         * 
         * Mutation product
         * 
         * 
         */
        addProduct: {
            type: ProductType,
            args: {
                barcode: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                selling_price: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parent, args) {
                let product = new Product({
                    _id: mongoose.Types.ObjectId(),
                    barcode: args.barcode,
                    name: args.name,
                    selling_price: args.selling_price
                })
                return product.save()
            }
        },
        updateBarcodeProduct: {
            type: ProductType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                barcode: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Product.findByIdAndUpdate(args._id, { "barcode": args.barcode }, { new: true, useFindAndModify: false });
            }
        },
        updateNameProduct: {
            type: ProductType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Product.findByIdAndUpdate(args._id, { $set: { "name": args.name } }, { new: true, useFindAndModify: false });
            }
        },
        updateSelling_priceProduct: {
            type: ProductType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                selling_price: { type: new GraphQLNonNull(GraphQLFloat) }
            },
            resolve(parent, args) {
                return Product.findByIdAndUpdate(args._id, { $set: { "selling_price": args.selling_price } }, { new: true, useFindAndModify: false });
            }
        },
        removeProduct: {
            type: ProductType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Product.findByIdAndRemove({ _id: args._id });
            }
        },
        /**
         * 
         * 
         * Mutation provider
         * 
         * 
         */
        addProvider: {
            type: ProviderType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                let provider = new Provider({
                    _id: mongoose.Types.ObjectId(),
                    name: args.name,
                    address: args.address,
                    phone: args.phone,
                    email: args.email
                })
                return provider.save()
            }
        },
        updateNameProvider: {
            type: ProviderType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Provider.findByIdAndUpdate(args._id, { $set: { "name": args.name } }, { new: true, useFindAndModify: false });
            }
        },
        updateAddressProvider: {
            type: ProviderType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                address: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Provider.findByIdAndUpdate(args._id, { $set: { "address": args.address } }, { new: true, useFindAndModify: false });
            }
        },
        updatePhoneProvider: {
            type: ProviderType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                phone: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Provider.findByIdAndUpdate(args._id, { $set: { "phone": args.phone } }, { new: true, useFindAndModify: false });
            }
        },
        updateEmailProvider: {
            type: ProviderType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Provider.findByIdAndUpdate(args._id, { $set: { "email": args.email } }, { new: true, useFindAndModify: false });
            }
        },
        removeProvider: {
            type: ProviderType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Provider.findByIdAndRemove({ _id: args._id });
            }
        },
        /**
         * 
         * 
         * Mutation reduction
         * 
         * 
         */
        addReduction: {
            type: ReductionType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                active: { type: new GraphQLNonNull(GraphQLBoolean) },
                rate: { type: new GraphQLNonNull(GraphQLFloat) },
                products: { type: new GraphQLList(GraphQLID) }
            },
            resolve(parent, args) {
                let reduction = new Reduction({
                    _id: mongoose.Types.ObjectId(),
                    name: args.name,
                    active: args.active,
                    rate: args.rate,
                    products: args.products
                })
                return reduction.save()
            }
        },
        updateNameReduction: {
            type: ReductionType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Reduction.findByIdAndUpdate(args._id, { $set: { "name": args.name } }, { new: true, useFindAndModify: false });
            }
        },
        updateActiveReduction: {
            type: ReductionType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                active: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                return Reduction.findByIdAndUpdate(args._id, { $set: { "active": args.active } }, { new: true, useFindAndModify: false });
            }
        },
        addProductsReduction: {
            type: ReductionType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                products: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
            },
            resolve(parent, args) {
                return Reduction.findByIdAndUpdate(args._id, { $push: { "products": args.products } }, { new: true, useFindAndModify: false });
            }
        },
        removeProductsReduction: {
            type: ReductionType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                products: { type: new GraphQLNonNull(new GraphQLList(GraphQLString)) }
            },
            resolve(parent, args) {
                return Reduction.findByIdAndUpdate(args._id, { $pullAll: { "products": args.products } }, { new: true, useFindAndModify: false });
            }
        },
        /**
         * 
         * 
         * Mutation settings
         * 
         * 
         */
        addSettings: {
            type: SettingsType,
            args: {
                photo_directory: { type: new GraphQLNonNull(GraphQLString) },
                cash_register: { type: new GraphQLNonNull(GraphQLBoolean) },
                scan: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                let settings = new Settings({
                    _id: mongoose.Types.ObjectId(),
                    photo_directory: args.photo_directory,
                    cash_register: args.cash_register,
                    scan: args.scan
                })
                return settings.save()
            }
        },
        updatePhotoDirectorySettings: {
            type: SettingsType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                photo_directory: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Settings.findByIdAndUpdate(args._id, { $set: { "photo_directory": args.photo_directory } }, { new: true, useFindAndModify: false });
            }
        },
        updateCashRegisterSettings: {
            type: SettingsType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                cash_register: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                return Settings.findByIdAndUpdate(args._id, { $set: { "cash_register": args.cash_register } }, { new: true, useFindAndModify: false });
            }
        },
        updateScanSettings: {
            type: SettingsType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                scan: { type: new GraphQLNonNull(GraphQLBoolean) }
            },
            resolve(parent, args) {
                return Settings.findByIdAndUpdate(args._id, { $set: { "scan": args.scan } }, { new: true, useFindAndModify: false });
            }
        },
        /**
         * 
         * 
         * Mutation slip
         * 
         * 
         */
        addSlipCoins: {
            type: SlipCoinsType,
            args: {
                member: { type: new GraphQLNonNull(GraphQLID) },
                num_slip: { type: new GraphQLNonNull(GraphQLString) },
                two: { type: new GraphQLNonNull(GraphQLInt) },
                one: { type: new GraphQLNonNull(GraphQLInt) },
                fiftycents: { type: new GraphQLNonNull(GraphQLInt) },
                twentycents: { type: new GraphQLNonNull(GraphQLInt) },
                tencents: { type: new GraphQLNonNull(GraphQLInt) },
                fivecents: { type: new GraphQLNonNull(GraphQLInt) },
                twocents: { type: new GraphQLNonNull(GraphQLInt) },
                onecents: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                var total_amount = 0;
                if (args.two) {
                    total_amount += args.two * 2;
                }
                if (args.one) {
                    total_amount += args.one * 1;
                }
                if (args.fiftycents) {
                    total_amount += args.fiftycents * 0.5;
                }
                if (args.twentycents) {
                    total_amount += args.twentycents * 0.2;
                }
                if (args.tencents) {
                    total_amount += args.tencents * 0.1;
                }
                if (args.fivecents) {
                    total_amount += args.fivecents * 0.05;
                }
                if (args.twocents) {
                    total_amount += args.twocents * 0.02;
                }
                if (args.onecents) {
                    total_amount += args.onecents * 0.01;
                }
                total_amount = Number.parseFloat(total_amount).toFixed(2);
                let today = new Date();
                let date = parseInt(today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();
                let slipcoins = new SlipCoins({
                    _id: mongoose.Types.ObjectId(),
                    date: date,
                    member: args.member,
                    num_slip: args.num_slip,
                    total_amount: total_amount,
                    two: args.two,
                    one: args.one,
                    fiftycents: args.fiftycents,
                    twentycents: args.twentycents,
                    tencents: args.tencents,
                    fivecents: args.fivecents,
                    twocents: args.twocents,
                    onecents: args.onecents
                })
                return slipcoins.save()
            }
        },
        addSlipTicket: {
            type: SlipTicketType,
            args: {
                member: { type: new GraphQLNonNull(GraphQLID) },
                num_slip: { type: new GraphQLNonNull(GraphQLString) },
                fifty: { type: new GraphQLNonNull(GraphQLInt) },
                twenty: { type: new GraphQLNonNull(GraphQLInt) },
                ten: { type: new GraphQLNonNull(GraphQLInt) },
                five: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                var total_amount = 0;
                if (args.fifty) {
                    total_amount += args.fifty * 50;
                }
                if (args.twenty) {
                    total_amount += args.twenty * 20;
                }
                if (args.ten) {
                    total_amount += args.ten * 10;
                }
                if (args.five) {
                    total_amount += args.five * 5;
                }
                total_amount = Number.parseFloat(total_amount).toFixed(2);
                let today = new Date();
                let date = parseInt(today.getMonth() + 1) + "-" + today.getDate() + "-" + today.getFullYear();
                let slipticket = new SlipTicket({
                    _id: mongoose.Types.ObjectId(),
                    date: date,
                    member: args.member,
                    num_slip: args.num_slip,
                    total_amount: total_amount,
                    fifty: args.fifty,
                    twenty: args.twenty,
                    ten: args.ten,
                    five: args.five
                })
                return slipticket.save()
            }
        },
        /**
         * 
         * 
         * Mutation training
         * 
         * 
         */
        addTraining: {
            type: TrainingType,
            args: {
                curriculum: { type: new GraphQLNonNull(GraphQLString) },
                wording: { type: new GraphQLNonNull(GraphQLString) },
                year: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                let training = new Training({
                    _id: mongoose.Types.ObjectId(),
                    curriculum: args.curriculum,
                    wording: args.wording,
                    year: args.year
                })
                return training.save()
            }
        },
        updateCurriculumTraining: {
            type: TrainingType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                curriculum: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Training.findByIdAndUpdate(args._id, { $set: { "curriculum": args.curriculum } }, { new: true, useFindAndModify: false });
            }
        },
        updateWordingTraining: {
            type: TrainingType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                wording: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Training.findByIdAndUpdate(args._id, { $set: { "wording": args.wording } }, { new: true, useFindAndModify: false });
            }
        },
        updateYearTraining: {
            type: TrainingType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) },
                year: { type: new GraphQLNonNull(GraphQLInt) }
            },
            resolve(parent, args) {
                return Training.findByIdAndUpdate(args._id, { $set: { "year": args.year } }, { new: true, useFindAndModify: false });
            }
        },
        removeTraining: {
            type: TrainingType,
            args: {
                _id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Training.findByIdAndRemove({ _id: args._id });
            }
        }
    }
});

module.exports = MutationType;