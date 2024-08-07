const jobs = require('../Models/jobSchema')

//add job logic
exports.addJob = async(req,res) => {
    console.log("Inside the addjob method");
    const { title, description, location, salary, type} = req.body
    const userId = req.payload
    console.log(title,description,location,salary,type);
    console.log(userId);
    try {
            const newJob = new jobs({ title, description, location, salary, type, userId })
            await newJob.save()
            res.status(200).json(" job added Successfull")
        
    }
    catch (err) {
        res.status(500).json({ message: "job adding failed", error: err.message })
    }

}

//1.Get a perticular user job details
exports.getAUserJobs = async(req,res) => {
    console.log("inside the get a user jobs");
    //get userid
    const userId = req.payload
    console.log(userId);
    try {
        const findoneJobs = await jobs.find({ userId })

        if(findoneJobs) {
            res.status(200).json(findoneJobs)
        } else {
            res.status(401).json("can't find the jobs details")
        }
    } catch (err) {
        res.status(401).json({ message: "jobs viewing failed", error: err.message })
    }
}

//2.get 3 jobs details for home project

exports.gethomeJobs = async(req,res) =>{

    const searchKey = req.query.title;
    const location = req.query.location;
    
console.log("inside get home projects");
    console.log(searchKey, location);

    // Construct the query object
    let query = {};
    if (searchKey) {
        query.title = { $regex: searchKey, $options: "i" };
    }
    if (location) {
        query.location = { $regex: location, $options: "i" };
    }
    try{
        const Homejobs = await jobs.find(query).limit(3)
        if(Homejobs){
            res.status(200).json(Homejobs)
        }else{
            res.status(401).json("can't find projects")
        }
    }catch(err){
        res.status(404).json({message:err.message})
    }
}

//3.get all projects details

exports.getAllJobs = async(req,res) =>{

    // const searchKey = req.query.search //search=${searchKey}-this is the query parameter from front end
    // console.log(searchKey);

    // let query = {}
    // //case sensitive & searching project
    // if(searchKey){
    //     query.title = {$regex:searchKey,$options:"i"}
    //     query.salary = {$regex:searchKey,$options:"i"}
    // } //$regex:,$options:"i" - its a prebuild code
    //     //we can use language,github,livelink instead of title

    const searchKey = req.query.title;
    const location = req.query.location;
    

    console.log(searchKey, location);

    // Construct the query object
    let query = {};
    if (searchKey) {
        query.title = { $regex: searchKey, $options: "i" };
    }
    if (location) {
        query.location = { $regex: location, $options: "i" };
    }
    
    
    try{
        const allJobs = await jobs.find(query)
        if(allJobs){
            res.status(200).json(allJobs)
        }else{
            res.status(401).json("can't find jobs")
        }
    }catch(err){
        res.status(401).json({message:err.message})
    }
}

//4.delete user project
exports.deleteUserJob = async(req,res) =>{
    const {jid} = req.params //get project id
    try{
        const deleteUserJob = await jobs.findOneAndDelete({_id:jid}) //find and delete the perticular projects and returns other projects
        res.status(200).json(deleteUserJob) 
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}

//5.update user jobs
exports.updateUserJob = async(req,res)=>{
    const { title,description,location,salary,type} = req.body
    userId = req.payload
    const {jid} = req.params
    try{
        //Find perticular project,update the data and save the changes
        const updateJob =await jobs.findByIdAndUpdate({_id:jid},{title,description,location,salary,type,userId})
        await updateJob.save()
        res.status(200).json(updateJob)
    }
    catch(err){
        res.status(401).json({message:err.message})
    }
}

