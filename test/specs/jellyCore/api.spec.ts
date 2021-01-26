import chai from 'chai';
import chaiHttp from 'chai-http';
chai.use(chaiHttp);
chai.should();

describe("POST /api/tasks", () => {
    it("It should POST a new task", (done) => {
        const obj = {
            "status": 1,
            "id": 1,
        }
        var url = 'https://crudcrud.com';
        chai.request(url)
            .post("/api/f1c093a2d6194dc4bc9dabe7621905e9/dinkar")
            .send(obj)
            .end((err, response) => {
                console.log(response)
                response.should.have.status(201);
                // response.body.should.be.a('object');
                // response.body.should.have.property('id').eq(4);
                // response.body.should.have.property('name').eq("Task 4");
                // response.body.should.have.property('completed').eq(false);
                done();
            });
    });
});
