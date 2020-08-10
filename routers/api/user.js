const express = require("express");
const router = express.Router();
const userModel = require("../../models/user");
const bcrypt = require('bcryptjs');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');
const {key} = require("../../config/key");
const passport = require("passport");


router.get("/", (req, res) => {
    res.json({msg: "这是测试数据"});
});

//处理注册
router.post("/register", (req, res) => {
    let {name, email, password, identity} = req.body
    userModel.findOne({email})
        .then(data => {
            //判断邮箱是否已经注册
            if (data) {
                return res.status(400).send("邮箱已经被注册")
            }

            //注册头像
            let avatar = gravatar.url(
                '89hzrec5k6@privaterelay.appleid.com',
                {s: '200', r: 'pg', d: '404'});
            // console.log(headPortrait)

            //实例化要加进数据库的对象
            let user = new userModel({
                name, email, password, avatar, identity
            })

            //密码加密,并存入数据库
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(user.password, salt, function (err, hash) {
                    if (err) throw err;
                    user.password = hash;
                    user.save()
                        .then(data => {
                            return res.json(data)
                        }).catch(err => {
                        console.log(err)
                    })
                });
            });
        })
        .catch(err => {
            console.log(err)
        })
})
//处理登录
router.post("/login", (req, res) => {
    console.log(req.body)
    let {email, password} = req.body
    userModel.findOne({email})
        .then(data => {
            if (!data) {
                return res.status(400).send("邮箱不存在")
            }
            //校验密码
            bcrypt.compare(password, data.password)
                .then(match => {
                    if (!match) {
                        return res.status(400).send("密码错误")
                    }
                    let {id, name, identity, avatar} = data;
                    let rule = {id, name, identity, avatar};
                    // console.log(rule)
                    jwt.sign(rule, key, {expiresIn: 3600}, (err, data) => {
                        if (err) throw err;
                        res.json({
                            success: true,
                            token: `Bearer ` + data
                        });
                    });
                })
                .catch(err => {
                    console.log(err)
                });
        })
        .catch(err => {
            console.log(err)
        });
});

router.get("/current",
    passport.authenticate('jwt', {session: false}),
    (req, res) => {
        res.json({msg: `success`})
    })

module.exports = router;
