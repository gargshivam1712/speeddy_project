const router = require('express').Router();
const controller = require('../controllers/products');
const Product = require("../models/products")



router.post('/' , async (req , res) =>{

    const productBody = req.body
    productBody['isPublished'] = false
    try {
        let data =  await Product.create(productBody)
       
        res.status(201).send(data)
    } catch (error) {
       
        res.status(400).send()
    }
    
})

router.get('/' , async(req , res) =>{
    try {
        
        let data = await Product.findAll()
        res.status(200).send(data)
    } catch (error) {
        res.status(400).send()
    }
})

router.patch('/:id' , async (req , res)=>{

        const id = req.params['id']
        const data = await Product.findByPk(id)
        console.log("id " , id)
        console.log(data)

        let mrp = data.getDataValue('mrp')
        let price = data.getDataValue('price')
        let stock = data.getDataValue('stock')

        console.log(mrp , price , stock)

        if (mrp < price && stock == 0)
        {
            console.log("both")
            res.status(422).send(["MRP should be less than equal to the Price", "Stock count is 0"])
        }
        else if(mrp < price)
        {
            console.log("price")
            res.status(422).send(["MRP should be less than equal to the Price"])
        }
        else if(stock == 0)
        {
            console.log("stock")
            res.status(422).send(["Stock count is 0"])
        }
        else
        {
            try {
                await Product.update({isPublished : true} , { where : { "id" : id } })
            res.status(204).send()
            } catch (error) {
                res.status(400).send()
            }
            
        }

        return 
})

router.delete('/:id' , (req , res)=>{
    res.status(405).send()
})

router.put('/:id' , (req , res)=>{
    res.status(405).send()
})

module.exports = router;
