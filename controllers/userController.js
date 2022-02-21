const mssql = require('mssql')
const config = require('../config/db')

async function getUsers (req,res){
    try{
        const pool = await mssql.connect(config)
        const result = await pool.request().execute("getUsers")
        res.json(result.recordset)
    } catch (err){
        console.log(err);
    }
}
async function getUser (req,res){
    const id = req.params.id
    try{
        let pool = await mssql.connect(config)
        const result1 = await pool.request()
        .input('id',  id)
        .execute("getUser")
        res.json(result1.recordset)

    } catch (err){
        console.log(err);
    }
}

async function addUser (req,res){
    const{firstname, secondname, email, project, password} = req.body
    try{
        let pool = await mssql.connect(config)
        await pool.request()
        .input('firstname', firstname)
        .input('secondname', secondname)
        .input('email', email)
        .input('project',  project)
        .input('password', password)
        .execute("addUser")
        res.json("user added successfully")

    } catch (err){
        console.log(err);
    }
}
async function updateUser (req,res){
    const{firstname, secondname, email, project, password} = req.body
    const id = req.params.id
    try{
        let pool = await mssql.connect(config)
        await pool.request()
        .input('id',  id)
        .input('firstname',  firstname)
        .input('secondname',  secondname)
        .input('email',  email)
        .input('project', project)
        .input('password',  password)
        .execute("updateUser")

        res.json("user added successfully")

    } catch (err){
        console.log(err);
    }
}
async function deleteUser (req,res){
    const id = req.params.id
    try{
        let pool = await mssql.connect(config)
        await pool.request()
        .input("id",id)
        .execute("deleteUser")
        res.json("User deleted successfully")

    } catch (err){
        console.log(err);
    }
}

module.exports = {
    getUsers,
    getUser,
    addUser,
    updateUser,
    deleteUser
}