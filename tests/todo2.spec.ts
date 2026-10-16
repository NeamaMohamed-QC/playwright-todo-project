import { test, expect } from '@playwright/test'
import User from '../models/User'
import RegisterPage from '../Pages/RegisterPage'
import NewTodoPage from '../Pages/NewTodoPage'
import TodoPage from '../Pages/TodoPage'

// Mixed API/UI test: registers through the API, then adds a todo through the UI.
test("user should be able to register using api", async ({ page, request, context }) => {
    const user = new User()
    // registeration using API - create user
    const registerPage = new RegisterPage(page, request, context)
    await registerPage.registerUsingTheApi(user)
    const newTodoPage = new NewTodoPage(page)
    await newTodoPage.load()
    await newTodoPage.addNewTask("playwright")
})


// Mixed API/UI test: registers through the API, then adds and verifies a todo through the UI, and attempts deletion there.
test("user should be able to add a todo using the POM", async ({ page, request, context }) => {
   // register 
    const user = new User()
    const registerPage = new RegisterPage(page, request, context)
    await registerPage.registerUsingTheApi(user)
    // add todo using ui
    const newTodoPage = new NewTodoPage(page)
    await newTodoPage.load()
    await newTodoPage.addNewTask("playwright")
    const todoPage = new TodoPage(page)
    const todoText= await todoPage.getTodoTextByIndex(0) // innertext() is used to get the text content of the element

    expect(todoText).toEqual("playwright") //to equal the text we added in the todo
    // like that we are telling playwright to get the text of the element and then we are asserting it with expect to be equal to the text we added in the todo
    
    // delete todo using UI
    const todoPage2 = new TodoPage(page)
    await todoPage2.load()
    await todoPage2.getDeleteIconByIndex(0)
    const noTodoMessage = await todoPage2.getNoTodoMessage()
    await expect (noTodoMessage).toBeVisible()


})
