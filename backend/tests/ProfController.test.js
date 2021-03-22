const {MockProfSchema, MockSubProfSchema} = require("./mocks");

function mockProfController() {
    const {ProfController} = require("../src/controller/ProfController");
    
    const mockProf = new MockProfSchema();
    const mockSubProf = new MockSubProfSchema();

    const profControl = new ProfController(mockProf, mockSubProf);

    return profControl;
}


test('Get prof data by id', async () => {
    
    const profControl = mockProfController();
    const id = 1;
    
    const expectedUser = {id: 1, description: "Oi", price: 50};
    const expectedReturn = {user: expectedUser, userFound: true, err: null};

    const resultsGetProfById = await profControl.getProfDataById(id);
    expect(resultsGetProfById).toStrictEqual(expectedReturn);

  });