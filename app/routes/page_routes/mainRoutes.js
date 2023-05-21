import express from "express";
import dotenv from "dotenv";
import axios from "axios";
const main = express.Router();


dotenv.config();


main.get("/login", (req,res) => {
    res.render('login');
})

main.get("/register", (req, res) => {
    res.render("register");
})

main.get("/logout", (req, res) => {
    console.log(res);
    res.clearCookie("accessToken", {domain: '127.0.0.1', path: '/main'});
    res.render("logout");
})


// landing page (top 7 trending coins)
main.get("/home", async (req, res) => {   
    console.log(req);
    const accessToken = req.cookies.accessToken;
    // console.log(req.body);
    let coinsArr = [];
    if (accessToken) {
        const resData = await axios.post("http://localhost:3001/api/coin/top", {}, {headers: 
                                        {Authorization: `Bearer ${accessToken}`}})
                        .then(res=>{
                            return res.data.result
                        })
                        .catch(err => {
                            console.log(err)
                        })
        if (await resData == undefined) {
            res.redirect('/main/login');
        } else {
            for (let i=0; i<7; i ++) {  
                let coinDetail = {
                    rank: resData[i].item.score,
                    coin_name: resData[i].item.name,
                    coin_id: resData[i].item.id,
                    thumb: resData[i].item.thumb,
                    small: resData[i].item.small,
                    large: resData[i].item.large,
                }
                coinsArr.push(coinDetail);
        }
    }
        res.render("home", {data: coinsArr});
    } else {
        res.redirect('/main/login')
    }

})

main.get('/assets', async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const target = "sgd" // can be changed accordingly
    const resData = await axios.post(`http://localhost:3001/api/user/profile/current-assets`, {target: target}, {headers: 
                            {Authorization: `Bearer ${accessToken}`}})
                                            .then(res=> {
                                                return res.data;
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            })
    console.log(resData);
    res.render('assets', {data: resData});
})

// search for coins 
main.get("/search", async (req, res)=> {
    // 
})

// coin page
main.get("/coin/:id", async (req, res) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        res.redirect('/main/login');
    } else {
        const id = req.params.id;
        const resData = await axios.post(`http://localhost:3001/api/coin/search/${id}`, {}, {headers: 
                                            {Authorization: `Bearer ${accessToken}`}})
                                .then(res=> {
                                    return res.data.result;
                                })
                                .catch(err => {
                                    console.log(err);
                                })

        if (resData == undefined) {
            res.redirect('/main/login');
        }
        res.render('coin', {data: resData});
    } 
})

main.get('/coin/:id/buy', async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const id = req.params.id;
    const resData = await axios.post(`http://localhost:3001/api/coin/search/${id}`, {}, {headers: 
                            {Authorization: `Bearer ${accessToken}`}})
                                            .then(res=> {
                                                return res.data.result;
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            })
    if (!accessToken || await resData == undefined) {
        res.redirect('/main/login');
    } else {
        res.render('buy', {id:req.params.id});
    }
})

main.get('/coin/:id/sell', async (req, res) => {
    const accessToken = req.cookies.accessToken;
    const id = req.params.id;
    const resData = await axios.post(`http://localhost:3001/api/coin/search/${id}`, {}, {headers: 
                            {Authorization: `Bearer ${accessToken}`}})
                                            .then(res=> {
                                                return res.data.result;
                                            })
                                            .catch(err => {
                                                console.log(err);
                                            })
    if (!accessToken || await resData == undefined) {
        res.redirect('/main/login');
    } else {
        res.render('sell', {id:req.params.id});
    }
})

main.use((req, res) => {
    res.status(404).render("error");
})

export default main;