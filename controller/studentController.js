const db = require('../models/indexstart')
const createError = require('http-error')

//use the model
const Student = db.students

module.exports={

    //add student
    addStudent :async(req, res, next)=>{
        try{
            let info = {
                firstName: req.body.firstname,
                lastName: req.body.lastname,
                gender: req.body.gender
            }
            const addstore = await student.create(info)
            res.status(200).send(addstore)
        }catch(error){
            next(error)
        }
    },
    getStudents :async (req, res, next)=>{
        try{
            let allStudents = await Student.findAll({})
            res.status(200).send(allStudents)

        }catch (error){
        next(error)
    }
},

//get students by id
getStudent :async(req, res, next)=>{
    try{
        let id = req.params.id
        let student = await Student.findOne({where: {student_id: id}})

        if(!student){
            throw(createError(404, "Student does not exist"))
        }
        req.status(200).send(student)
    }catch(error){
        next(error)
    }
},

//update student
updateStudent :async(req, res, next)=>{
    try{
        let id = req.params.id

        const student = await Student.update(req.body,{where: {student_id:id}})
        if(!student){
            throw(createError(404, "student does not exist"))
        }
        res.status(200).send(student)
    }catch (error){
        next(error)
    }
},

deleteStudent :async(req, res, next)=>{
    try{
        let id = req.params.id

         await Student.destroy({where: {student_id:id}})
       
        res.status(200).send("student Deleted Successfully")
    }catch (error){
        next(error)
    }
}
};
