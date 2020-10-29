import { body } from "express-validator";
import { toDefaultValue } from "sequelize/types/lib/utils";

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
                        .isCurrency({symbol:'', digits_after_decimal: [0,1,2]})
                        .withMessage('Value must be a valid price')
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
                        .isCurrency({symbol:'', digits_after_decimal: [0,1,2]})
                        .withMessage('Value must be a valid price')
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
                        .isEmail().withMessage('Invalid email'),

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
                        .isEmail().withMessage('Invalid email'),

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
}

const validateDOB = (date: Date) => {
    if (date.getTime() >= Date.now()) {
        return Promise.reject('Date of birth must be in the past');
    }
    return Promise.resolve();
}