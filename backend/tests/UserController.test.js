const {MockHashService, MockUserSchema, MockProfSchema} = require("./mocks");

function mockUserController() {
    const {UserController} = require("../src/controller/UserController");
    
    const mockHash = new MockHashService();
    const mockUser = new MockUserSchema();
    const mockProf = new MockProfSchema();

    const userControl = new UserController(mockHash, mockUser, mockProf);

    return userControl;
}


test('Search user by email', async () => {
    
    const userControl = mockUserController();
    const email = "teste@email.com";
    
    const expectedUser = {id: 1, email: "teste@email.com", password: "teste", professor: false}
    const expectedReturn = {user: expectedUser, userFound: true, err: null};

    const resultsSearchUserByEmail = await userControl.getUserByEmail(email);

    expect(resultsSearchUserByEmail).toStrictEqual(expectedReturn);
  });
  
test('Hashing user password', async () => {
    const userControl = mockUserController();
    const password = "teste";
    const expectedHash = password;

    const hashedPassword = await userControl.hashPassword(password);
    expect(hashedPassword).toBe(expectedHash);
  });

test('A given user password and its hash are the same password', async () => {        
    const userControl = mockUserController();
    const password = "teste";

    const hashPassword = password;
    const theSame = await userControl.checkSamePassword(hashPassword, password);

    expect(theSame).toBeTruthy();
  });

test('Search user by id', async () => {
    const userControl = mockUserController();
    const id = 1;
    
    const expectedUser = {id: 1, email: "teste@email.com", password: "teste", professor: false}
    const expectedReturn = {user: expectedUser, userFound: true, err: null};

    const resultsSearchUserById = await userControl.getUserById(id);
    expect(resultsSearchUserById).toStrictEqual(expectedReturn);
  });



