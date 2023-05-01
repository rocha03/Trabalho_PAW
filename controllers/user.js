const mongoose = require('mongoose');
const Service = require('../models/services');
const Type = require('../models/type');

let userController = {};

userController.service_get = (req, res, next) => {
    const id = req.params.id;

    Service.findById(id)
        .then(service => {
            Type.findById(service.type)
                .then(type => {
                    res.render('user/servicos', { title: service.name, service, type });
                })
                .catch(err=> {
                    console.log(err);
                    res.status(404).render('404', { title: '404', message: err });
                });
        })
        .catch(err=> {
            console.log(err);
            res.status(404).render('404', { title: '404', message: err });
        });
}

module.exports = userController;