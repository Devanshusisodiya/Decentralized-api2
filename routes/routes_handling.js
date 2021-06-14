const express = require('express')
const router = require('express').Router()
const Hero = require('../models/hero')


router.get('/', async (req, res) => {
    try{
        const heros = await Hero.find()
        res.json(heros)
    }catch (error){
        res.status(500).json({message: error})
    }
    
})

router.post('/',  async (req, res) => {
    const name = req.body.name
    var state = false
    const prevHeros = await Hero.find()
    prevHeros.forEach((hero) => {
        if(hero['name'] === name){
            state = true
        }
    })

    if(state){
        res.status(403).json({message: 'Name already exists'})
        
    }else{
        const hero = new Hero({
            name: req.body.name,
            superpower: req.body.superpower
        })
        try{
            const newHero = await hero.save()
            res.status(201).json(newHero)
        }catch(error){
            res.status(400).json({message: error.message})
        }
    }

})

module.exports = router