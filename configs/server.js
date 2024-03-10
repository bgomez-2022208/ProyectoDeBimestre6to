'use strict';

import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { dbConnection } from './mongo.js';
import adminsRoutes from '../src/admin/admin.routes.js';
import customerRoutes from '../src/customer/customer.routes.js';
import authRoutes from '../src/auth/auth.routes.js';
import productRoutes from '../src/product/product.routes.js';
import categoriaRoutes from '../src/category/category.routes.js';

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.adminPath = '/api/v1/admin';
        this.clientPath = '/customer/v1/users';
        this.authPath = '/api/v1/auth';
        this.productPath = '/api/v1/product';
        this.categoriaPath = '/api/v1/categoria';

        this.middlewares(); 
        this.conectarDB(); 
        this.routes();  
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {
        this.app.use(express.urlencoded({ extended: false }));
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(helmet());
        this.app.use(morgan('dev'));
    }

    routes() {
        this.app.use(this.adminPath,adminsRoutes);
        this.app.use(this.clientPath, customerRoutes);
        this.app.use(this.authPath,authRoutes);
        this.app.use(this.productPath, productRoutes);
        this.app.use(this.categoriaPath, categoriaRoutes);
        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running on port ', this.port);
        });
    }
}

export default Server;