import { body, param } from "express-validator";
import { request } from "http";
import { toDefaultValue } from "sequelize/types/lib/utils";
import { Product } from "../models/Product";
import { User } from "../models/User";

export default {

    validateProduct(method: String) : any {
        switch (method) {
            case 'create': {
                return [
                    body('name')
                        .exists().withMessage('A name is equired')
                        .isLength({min: 2}).withMessage('The name must be' +
                        ' at least 2 characters long'),

                    body('value')
                        .exists().withMessage('A value is required.')
                        .isCurrency({symbol: ''})
                        .withMessage('Value must be a valid price')
                        .custom(PositivePrice)
                ];
            }
            case 'update': {
                return [
                    body('name')
                        .optional()
                        .isLength({min: 2}).withMessage('The name must be' +
                        ' at least 2 characters long'),

                    body('value')
                        .optional()
                        .isCurrency({symbol: ''})
                        .withMessage('Value must be a valid price')
                        .custom(PositivePrice)
                ];
            }
        }
    },

    validateUser(method: String) : any {
        switch (method) {
            case 'create': {
                return [
                    body('email')
                        .exists().withMessage('An email account is required')
                        .isEmail().withMessage('Invalid email')
                        .custom(emailInUse),

                    body('password')
                        .exists().withMessage('A password is required.')
                        .isLength({min: 5}).withMessage('The password must be' +
                         ' at least 5 characters long'),

                    body('name')
                        .exists().withMessage('A name is equired')
                        .isLength({min: 2}).withMessage('The name must be' +
                        ' at least 2 characters long'),

                    body('date_of_birth')
                        .exists().withMessage('A date of birth is required.')
                        .isDate().withMessage('Date of birth must be a valid date')
                        .toDate().custom(validateDOB)
                        
                ];
            }
            case 'update': {
                return [
                    body('email')
                        .optional()
                        .isEmail().withMessage('Invalid email')
                        .custom(emailInUse),

                    body('password')
                        .optional()
                        .isLength({min: 5}).withMessage('The password must be' +
                         ' at least 5 characters long'),

                    body('name')
                        .optional()
                        .isLength({min: 2}).withMessage('The name must be' +
                        ' at least 2 characters long'),

                    body('date_of_birth')
                        .optional()
                        .isDate().withMessage('Date of birth must be a valid date')
                        .toDate().custom(validateDOB)
                ];
            }
        }
    },

    validadeOffer() {
        return [
            body('value')
                .isCurrency({symbol: ''})
                .withMessage('Value must be a valid price')
                .custom(PositivePrice),
            param('user_id').custom(userExists),
            param('product_id').custom(productExists)
        ];
    }
}

const validateDOB = (date: Date) => {
    if (date.getTime() >= Date.now()) {
        return Promise.reject('Date of birth must be in the past');
    }
    return Promise.resolve();
}

const PositivePrice = (price: number) => {
    if(price <= 0) {
        return Promise.reject('Value must be a valid price');
    }
    return Promise.resolve();
}

const emailInUse = async (email: string) => {
    try {
        const user = await User.findOne({where: {'email': email}});
        if (user) return Promise.reject('Email already in use');
        return Promise.resolve();

    } catch(err) {
        return Promise.reject('Error verifying email');
    }
}

const userExists = async (id: any) => {
    try {
        const user = await User.findByPk(id);
        if (!user) return Promise.reject('No user with id ' + id);
        return Promise.resolve();

    } catch(err) {
        return Promise.reject('Error verifying user');
    }
}

const productExists = async (id: any) => {
    try {
        const product = await Product.findByPk(id);
        if (!product) return Promise.reject('No product with id ' + id);
        return Promise.resolve();

    } catch(err) {
        return Promise.reject('Error verifying product');
    }
}