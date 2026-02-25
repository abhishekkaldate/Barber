import { Request, Response } from "express";
import Address from "../models/Address.js";

//get user
//GET /api/addresses
export const getAddresses = async (req: Request, res: Response)=>{
    try {

        const addresses = await Address.find({user: req.user._id}).sort({isDefault: -1, createdAt: -1})
        res.json({success: true, data: addresses})
    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });                            
    }
}

//add new
//POST /api/ addresses
export const addAddresses = async (req: Request, res: Response)=>{
    try {

        const { type, street, city, state, zipCode, country, isDefault } = req.body;

        if(isDefault){
            await Address.updateMany({user: req.user._id}, {isDefault: false})
        }

        const newAddress = await Address.create({user: req.user._id, type, street, city, state, zipCode, country, isDefault: isDefault || false})

        res.status(201).json({success: true, data: newAddress})


    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });                            
    }
}

//update
//PUT /api/address/:id
export const updateAddresses = async (req: Request, res: Response)=>{
    try {

        const { type, street, city, state, zipCode, country, isDefault } = req.body;

        let addressItem = await Address.findById(req.params.id)

        if(!addressItem){
        return res.status(404).json({success: false, message: "Address not Found"})
        }

        //Ensure
        if(addressItem.user.toString() !== req.user._id.ToString()){
                    res.status(401).json({success: false, message: "not authorized"});
        }

        if(isDefault){
            await Address.updateMany({user: req.user._id}, {isDefault: false})
        }

         addressItem = await Address.findByIdAndUpdate(req.params.id, { type, street, city, state, zipCode, country}, {new: true})

        res.json({success: true, data: addressItem})
        

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });                            
    }
}

//Delete
//DELETE /api/addresses/:id
export const deleteAddresses = async (req: Request, res: Response)=>{
    try {

        const address = await Address.findById(req.params.id)


        if(!address){
        return res.status(404).json({success: false, message: "Address not Found"})
        }

        //Ensure
        if(address.user.toString() !== req.user._id.ToString()){
                    res.status(401).json({success: false, message: "not authorized"});
        }

        await address.deleteOne()
        res.json({success: true, message: "Address removed"})
        

    } catch (error: any) {
        res.status(500).json({ success: false, message: error.message });                            
    }
}