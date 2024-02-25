import { Request, Response } from "express";
import { Product, ProductOffline } from "../schema/products";
import { Expression } from "mongoose";
import { app } from "../config/config";
import { fetchUser } from "../middleware/fetch";
import { RequestUser, UserDocument } from "./types/routes";
import { Users } from "../schema/user"
import express from 'express'

export const router = () => {

    app.use(express.json())
    // Online Add Product
    app.post('/addproduct', async (req: Request, res: Response) => {
        try {
            const products = await Product.find({}).exec();
            let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;

            const product = new Product({
                id: id,
                name: req.body.name,
                image: req.body.image,
                category: req.body.category,
                new_price: req.body.new_price,
                old_price: req.body.old_price,
            });

            await product.save();
            console.log('Regular product saved');

            res.json({
                success: true,
                name: req.body.name,
            });
        } catch (error) {
            console.error("Error occurred while adding regular product:", error);
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    });

    // Offline Add Product
    app.post('/addproductoffline', async (req: Request, res: Response) => {
        try {
            const productsOffline = await ProductOffline.find({});
            let id = productsOffline.length > 0 ? productsOffline[productsOffline.length - 1].id + 1 : 1;

            const productOffline = new ProductOffline({
                id: id,
                name: req.body.name,
                image: req.body.image,
                category: req.body.category,
                new_price: req.body.new_price,
                old_price: req.body.old_price,
            });

            await productOffline.save();
            console.log(productOffline)
            console.log('Offline product saved');

            res.json({
                success: true,
                name: req.body.name,
            });
        } catch (error) {
            console.error("Error occurred while adding offline product:", error);
            res.status(500).json({ success: false, error: "Internal server error" });
        }
    });

    // Online Remove Product
    app.post('/removeproduct', async (req: Request, res: Response): Promise<Expression> => {
        await Product.findOneAndDelete({ id: req.body.id });
        console.log('online removed')
        res.json({
            success: true,
            name: req.body.name
        })
    })

    // Offline Remove Product
    app.post('/removeofflineproduct', async (req: Request, res: Response): Promise<Expression> => {
        try {
            const deletedProduct = await ProductOffline.findOneAndDelete({ id: req.body.id });
            if (!deletedProduct) {
                return res.status(404).json({ success: false, message: 'Product not found' });
            }
            console.log('Offline product removed:', deletedProduct);
            res.json({
                success: true,
                name: deletedProduct.name
            });
        } catch (error) {
            console.error('Error removing offline product:', error);
            res.status(500).json({ success: false, message: 'Internal server error' });
        }
    });

    // Get All product online

    app.get('/allproducts', async (_req: Request, res: Response): Promise<Expression> => {
        let products = await Product.find({})
        res.send(products)
        console.log(products)
        console.log('All products online fetched.')
    })

    // Get All product offline

    app.get('/allofflineproducts', async (_req: Request, res: Response): Promise<Expression> => {
        let products = await ProductOffline.find({})
        res.send(products)
        console.log(products)
        console.log('All products offline fetched.')
    })

    // All product online

    app.get('/allproducts', async (_req: Request, res: Response): Promise<Expression> => {
        let products = await Product.find({})
        res.send(products)
        console.log(products)
        console.log('All products offline fetched.')
    })

    // Get New  Offline Collection

    app.get('/newofflinecollection', async (_req: Request, res: Response): Promise<Expression> => {
        let products = await ProductOffline.find({})
        let newcollection = products.slice(1).slice(-8)
        console.log("New Collection Fetched")
        res.send(newcollection)
    })

    // Get New  Online Collection

    app.get('/newcollection', async (_req: Request, res: Response): Promise<Expression> => {
        let products = await Product.find({})
        let newcollection = products.slice(1).slice(-8)
        console.log("New Collection Fetched")
        res.send(newcollection)
    })

    // Popular Offline in Women

    app.get('/popularinofflinewomen', async (_req: Request, res: Response): Promise<Expression> => {
        let products = await ProductOffline.find({ category: "women" })
        let popular_in_women = products.slice(0, 4)
        console.log("Popular in Women Fetched")
        res.send(popular_in_women)
    })

    // Popular Online in Women

    app.get('/popularinwomen', async (_req: Request, res: Response): Promise<Expression> => {
        let products = await Product.find({ category: "women" })
        let popular_in_women = products.slice(0, 4)
        console.log("Popular in Women Fetched")
        res.send(popular_in_women)
    })

    // Cart Data

    app.post('/addtocart', fetchUser, async (req: Request,res: Response):Promise<Expression> => {
        console.log('added',req.body.itemId)
        const reqs = req as unknown
        let userData = await Users.findOne({_id:(reqs as RequestUser).user.id})
        userData!.cartData[req.body.itemId as number] += 1
        await Users.findOneAndUpdate({_id:(reqs as RequestUser).user.id},{cartData:userData!.cartData})
        res.send("Added")
    });

    app.post('/removefromcart',fetchUser,async (req: Request, res: Response):Promise<Expression> => {
        console.log('removed',req.body.itemId)
        const reqs = req as unknown
        let userData = await Users.findOne({_id:(reqs as RequestUser).user.id})
        if(userData!.cartData[req.body.itemId as number])
        userData!.cartData[req.body.itemId as number] -= 1
        await Users.findOneAndUpdate({_id:(reqs as RequestUser).user.id},{cartData:userData!.cartData})
        res.send("Removed")
    })

    // Get cart data

    app.post('/getcart',fetchUser,async (req: Request,res: Response): Promise<Expression> => {
        console.log('Get CartData')
        const reqs = req as unknown
        let userData = await Users.findOne({_id:(reqs as RequestUser).user.id})
        res.json(userData!.cartData);
    })
}