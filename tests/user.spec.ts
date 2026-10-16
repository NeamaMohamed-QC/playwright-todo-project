import { test, expect } from '@playwright/test'
import User from '../models/User'
import RegisterPage from '../Pages/RegisterPage'
import TodoPage from '../Pages/TodoPage'

// UI test: registers a user through the website's signup form and verifies the welcome message.
test("user should be registred to the todo website successfully", async ({ page }) => {
  const user = new User()

  const registerPage = new RegisterPage(page)
  await registerPage.load()
  await registerPage.RegisterSteps(user)
  const todopage = new TodoPage(page)
  const welocmemessage = todopage.getWelcomeMessage()
  await expect(welocmemessage).toBeVisible()


})