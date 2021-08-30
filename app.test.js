const request = require('supertest');
const app = require('./app.js');
const mongoose = require('mongoose');
require('dotenv').config();
const db = require('./db/index');
const ObjectID = require('mongodb').ObjectID;
const Task = require('./models/task');
const { mock_tasks } = require('./seeds/mock_data');
process.env.NODE_ENV = "test";

const seedDB = async () => {
    await Task.create(mock_tasks);
    console.log("Database seeded with", mock_tasks, "\n");
}

beforeAll(async () => {
    await db.connect();
    await db.clearDatabase();
    await Task.createCollection().then(console.log("Task collection is created!"));
});
beforeEach(async () => await seedDB());
afterEach(async () => await db.clearDatabase());
afterAll(async () => await db.disconnect());

//a promotion means a subtask is promoted to a task
describe("Promote a subtask to a task via PATCH /task/:id/promote", () => {
    //task1 is taskDraggedByUser and task2 is taskDroppedOnByUser
    // it('PATCH /task/1/promote --> task 1 with null parentTask field', () => {
    //     request(app)
    //         .patch('/task/1/promote')
    //         .then(res => {
    //             expect(res.body).toEqual(
    //                 expect.arrayContaining([
    //                     expect.objectContaining({

    //                     })
    //                 ])
    //             )
    //         })
    // })
    it('PATCH /task/1/promote --> remove task 1 ID from task 1\'s parent task subtasks array', () => { })
    it('PATCH /task/1/promote --> task 2 subtasks array contains task 1 ID (check that before it didn\'t)', () => { })
    it('PATCH /task/1/promote --> 200 status code if all went well', () => { })
    it('PATCH /task/1/promote --> 404 status code if one or both tasks not found in database', () => { })
})