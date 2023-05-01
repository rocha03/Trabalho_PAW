const mongoose = require('mongoose');
const Service = require("../models/services");
const Type = require("../models/type");

let adminController = {};

/* For Snoopers */
adminController.notadmin_get = (req, res, next) => {
    res.render('admin/notadmin', { title: 'NotAdmin' });
};

/* For new serviçes */
adminController.novoServico_get = (req, res, next) => {
    Type.find()
    .then(result => {
        res.render('admin/novoServico', { title: 'Novo Serviço', types: result, service: new Service() });
    })
    .catch(err => {
        res.render('404', { title: '404', message: err });
    });
};

adminController.novoServico_post = async (req, res, next) => {
    console.log(req.body);
    const service = new Service({
        type: req.body.type,
        name: req.body.name,
        desciption: req.body.desciption,
        ticketPrices: req.body.ticketPrices
    });

    try {
        await service.save();
        res.redirect('/dashboard');
    } catch (err) {
        console.log(err);
        res.status(400).json({ error: { message: err.message }});
    }
}

/* For new types of services */
adminController.novoTipo_get = (req, res, next) => {
    Type.find()
    .then(result => {
        res.render('admin/novoTipo', { title: 'Novo Serviço', types: result });
    })
    .catch(err => {
        console.log(err);
        res.render('404', { title: '404', message: err });
    });
};

adminController.novoTipo_post = async (req, res, next) => {
    try {
        if (!req.body) {
            return res.status(400).json({ error: { message: 'Nome é obrigatório.' }});
        }
        const type = new Type(req.body);
        await type.save();
        res.status(201).json({ type: type._id });
    } catch (err) {
        console.log(err);
        if (err.code === 11000) {
            res.status(400).json({ error: { message: 'Tipo já existe.' }});
        } else {
            res.status(400).json({ error: { message: err.message }});
        }
    }
  };

/* To update serviçes */
adminController.editarServico_get = (req, res, next) => {
    res.render('admin/editarServico', { title: 'Novo Serviço' });
};

adminController.editarServico_put = async (req, res, next) => {

};

/* To delete serviçes */

adminController.removerServico_post = async (req, res, next) => {
    const id = req.params.id;

    Service.findByIdAndDelete(id)
        .then(result => {
            res.redirect('/dashboard');
        })
        .catch(err => {
            console.log(err);
        });
};

module.exports = adminController;