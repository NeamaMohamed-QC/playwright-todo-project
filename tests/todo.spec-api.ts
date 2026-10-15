import { test, expect } from '@playwright/test'
import User from '../models/User'
import RegisterPage from '../Pages/RegisterPage'
import NewTodoPage from '../Pages/NewTodoPage'
import TodoPage from '../Pages/TodoPage'

test("user should be be able to register", async ({ page, request, context }) => {
    const user = new User()
    // registeration using API - create user
    const registerPage = new RegisterPage(page, request, context)
    await registerPage.registerUsingTheApi(user)
})

test("user should be able to add and delete todo", async ({ page, request, context }) => {
    const user = new User()
    // registeration using API
    const registerPage = new RegisterPage(page, request, context)
    await registerPage.registerUsingTheApi(user)

    // add todo using API
    //  await new TodoApi(request).AddTodo(user)

    //using api from pom
    const newTodoPage = new NewTodoPage(page, request)
    await newTodoPage.getAddNewTaskUsingApi(user)


    // delete todo
    const todoPage = new TodoPage(page)
    await todoPage.load()
    await todoPage.getDeleteIconByIndex(0)
    const noTodoMessage = await todoPage.getNoTodoMessage()
    await expect(noTodoMessage).toBeVisible
})

