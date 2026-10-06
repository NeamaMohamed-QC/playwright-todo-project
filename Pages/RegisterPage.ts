import { APIRequestContext, BrowserContext, Page } from "@playwright/test";
import User from "../models/User";
import UserApi from "../apis/UserApi";
import config from '../playwright.config'

export default class RegisterPage {
  private page: Page
  private request?: APIRequestContext
  private context?: BrowserContext
  // constructor
  constructor(page: Page, request?: APIRequestContext, context?: BrowserContext) {
    this.page = page
    this.request = request
    this.context = context
  }
  // elements 
  private get lastNameInput() {
    return this.page.getByTestId("first-name")
  }
  private get firstNameInput() {
    return this.page.getByTestId("last-name")
  }
  private get emailInput() {
    return this.page.getByTestId("email")
  }
  private get passwordInput() {
    return this.page.getByTestId("password")
  }
  private get confirmPasswordInput() {
    return this.page.getByTestId("confirm-password")
  }
  private get submitButton() {
    return this.page.getByRole("button", { name: "Signup" })
  }

  // methods or steps
  async load() {
    await this.page.goto("/signup")
  }

  async RegisterSteps(user: User) {
    await this.firstNameInput.fill(user.getFirstName())
    await this.lastNameInput.fill(user.getLastName())
    await this.emailInput.fill(user.getEmail())
    await this.passwordInput.fill(user.getPassword())
    await this.confirmPasswordInput.fill(user.getPassword())
    await this.submitButton.click()
  }

  // Registeration using API
  async registerUsingTheApi(user: User) {
    const response = await new UserApi(this.request!).register(user)

    // set cookies

    const responseBody = await response.json() //saving response data in a variable to be able to extract needed info
    const accessToken = responseBody.access_token // extract accesstoken from responsebody
    const userID = responseBody.userID // extract userID from responsebody
    const firstName = responseBody.firstName // extract firstName from responsebody

    user.setAccesstoken(accessToken)


    await this.context!.addCookies([
      {
        name: "access_token",
        value: accessToken,
        url: config.use?.baseURL
      },
      {
        name: "firstName",
        value: firstName,
        url: config.use?.baseURL
      },
      {
        name: "userID",
        value: userID,
        url: config.use?.baseURL
      },
    ])
  }



}