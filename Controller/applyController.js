
const apply = require('../Models/applySchema')

//add apply details logic
exports.applyJob = async (req, res) => {
    console.log("Inside the applyJob method");
    const { name,email,phone,qualifications} = req.body
    const cvImage = req.file.filename
    const userId = req.payload
    console.log(name,email,phone,qualifications,cvImage);
    console.log(userId);
    try {
            const newJob = new apply({ name, email, phone, qualifications, cvImage, userId })
            await newJob.save()
            res.status(200).json("Applyed Job  Successfull")
        
    }
    catch (err) {
        res.status(500).json({ message: "job applying failed", error: err.message })
    }

}