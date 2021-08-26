const request = require('supertest');
const app = require('./app.js');

describe("PATCH /task/:id/promote", () => {
    it('should throw 404 if task ID in req.params is not found', () => { })
    it('should throw 404 if task ID in req.body is not found', () => { })
    it('should search database and find task1 and task2 by ID', () => { })
    it('should search database and find task1 and task2 by ID', () => { })

    //task1 is taskDraggedByUser and task2 is taskDroppedOnByUser
    it('should delete parentTask attribute from task1', () => { })
    it('should push task1\'s id to task2\`s subtasks array property', () => { })
    it('should save task1 and task2 onto database', () => { })
})