const express = require("express");
const router = express.Router();
const profileModel = require("../../models/profile");
const passport = require("passport");


//增
router.post("/",
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        let profileFields = {};
        if (req.body.type) {
            profileFields.type = req.body.type
        }
        ;
        if (req.body.descript) {
            profileFields.descript = req.body.descript
        }
        ;
        if (req.body.income) {
            profileFields.income = req.body.income
        }
        ;
        if (req.body.expend) {
            profileFields.expend = req.body.expend
        }
        ;
        if (req.body.cash) {
            profileFields.cash = req.body.cash
        }
        ;
        if (req.body.remark) {
            profileFields.remark = req.body.remark
        }
        ;

        new profileModel(profileFields)
            .save()
            .then(data => {
                res.json(data)
            })
            .catch(err => {
                res.status(400).json(err)
            })
    })

//删
router.delete("/:id",
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        profileModel.findOneAndRemove({_id: req.params.id})
            .then(
                data => {
                    data.save()
                        .then(data => {
                            res.json("data");
                        }).catch(
                        err => {
                            res.json(err);
                        }
                    )
                }
            )
            .catch(err => {
                res.status(400).json("删除失败");
            })
    })
//改
router.put("/:id",
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        let profileFields = {};
        if (req.body.type) {
            profileFields.type = req.body.type
        }
        ;
        if (req.body.descript) {
            profileFields.descript = req.body.descript
        }
        ;
        if (req.body.income) {
            profileFields.income = req.body.income
        }
        ;
        if (req.body.expend) {
            profileFields.expend = req.body.expend
        }
        ;
        if (req.body.cash) {
            profileFields.cash = req.body.cash
        }
        ;
        if (req.body.remark) {
            profileFields.remark = req.body.remark
        }
        ;
        profileModel.findOneAndUpdate(
            {_id: req.params.id},//查找id
            {$set: profileFields},//更改数据
            {new: true})//通知更新
            .then(data => {
                if (!data) {
                    return res.status(400).json("查询不到")
                }
                res.json({data})
            })
            .catch(err => {
                res.status(400).json(err)
            })
    })
//查
router.get("/",
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        profileModel.find()
            .then(data => {
                if (!data) {
                    return res.status(400).json("查询不到")
                }
                res.json({data})
            })
            .catch(err => {
                res.status(400).json(err)
            })
    })

router.get("/:id",
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        profileModel.findOne({_id: req.params.id})
            .then(data => {
                if (!data) {
                    return res.status(400).json("查询不到")
                }
                res.json({data})
            })
            .catch(err => {
                res.status(400).json(err)
            })
    })

module.exports = router;