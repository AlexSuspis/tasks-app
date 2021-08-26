const request = require('supertest');
const app = require('./app.js');
const mongoose = require('mongoose');
require('dotenv').config();

beforeAll(async () => {

    const testDBUrl = process.env.TESTDBURL;
    await mongoose.connect(testDBUrl, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(res => console.log("connected to test db"))
        .catch(err => err);

    // const collection = process.env.COLLECTION;
    // await db.createCollection(collection);
})

afterAll(async () => {
    // const collection = "test_" + process.env.COLLECTION;
    // await db.dropCollection(collection);
    // await db.dropDatabase();

    await mongoose.disconnect();
})

describe("Database queries", () => {
    it('should throw 404 if task ID in req.params is not found in database', () => {

    })
    it('should throw 404 if task ID in req.body is not found in database', () => { })
    it('should search database and find task1 and task2 by ID', () => { })
    it('should search database and find task1 and task2 by ID', () => { })
})

//a promotion means a subtask is promoted to a task
describe("Promote a subtask to a task via PATCH /task/:id/promote", () => {
    //task1 is taskDraggedByUser and task2 is taskDroppedOnByUser
    it('should update task1\'s parentTask ID attribute to be null', () => { })
    it('should delete task1\'s ID from task1\'s parentTask subtask array', () => { })
    it('should push task1\'s id to task2\`s subtasks array property', () => { })
    it('should save task1 and task2 onto database', () => { })
})