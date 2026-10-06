import { test, expect } from '@playwright/test'
import { faker } from '@faker-js/faker'
import { $ } from '@faker-js/faker/dist/index-BSUsvzGS'
import User from '../models/User'
import UserApi from '../apis/UserApi'
import TodoApi from '../apis/TodoApi'

test("user should be be able to register", async ({ page, request, context }) => {
    const user = new User (faker.person.firstName(), faker.person.lastName(), faker.internet.email(), "Neama@#123")
    // registeration using API - create user
    const response = await new UserApi(request).register(user)

    // set cookies

    const responseBody = await response.json() //saving response data in a variable to be able to extract needed info
    const accessToken = responseBody.access_token // extract accesstoken from responsebody
    const userID = responseBody.userID // extract userID from responsebody
    const firstName = responseBody.firstName // extract firstName from responsebody

    user.setAccesstoken (accessToken)


    await context.addCookies([
        {
            name: "access_token",
            value: accessToken,
            url: "https://todo.qacart.com"
        },
        {
            name: "firstName",
            value: firstName,
            url: "https://todo.qacart.com"
        },
        {
            name: "userID",
            value: userID,
            url: "https://todo.qacart.com"
        },
    ])
})

test("user should be able to add and delete todo", async ({ page, request, context }) => {
        const user = new User (faker.person.firstName(), faker.person.lastName(), faker.internet.email(), "Neama@#123")

    // registeration using API
   const response = await new UserApi(request).register(user)
   
    const responseBody = await response.json()
    const accessToken = responseBody.access_token
    const userID = responseBody.userID
    const firstName = responseBody.firstName

    await context.addCookies([
        {
            name: "access_token",
            value: accessToken,
            url: "https://todo.qacart.com"
        },
        {
            name: "firstName",
            value: firstName,
            url: "https://todo.qacart.com"
        },
        {
            name: "userID",
            value: userID,
            url: "https://todo.qacart.com"
        },
    ])
    // add todo using API

 await new TodoApi (request).AddTodo (user)


    // delete todo
    await page.goto("/todo")
     page.getByTestId("delete").click
    await expect(page.getByText("No Available Todos")).toBeVisible();
})

