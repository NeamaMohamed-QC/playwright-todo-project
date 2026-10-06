//elements constructors methods
import { APIRequestContext, Page } from '@playwright/test'
import User from '../models/User'
import TodoApi from '../apis/TodoApi'

export default class NewTodoPage {
    private page: Page
    private request?: APIRequestContext
    constructor(page: Page, request?: APIRequestContext) {
        this.page = page
        this.request = request
    }

    private get newTodoInput() {
        return '[data-testid="new-todo"]'
    }

    private get newSubmitButton() {
        return '[data-testid="submit-newTask"]'

    }


    async load() {
        await this.page.goto("/todo/new")
    }
    async addNewTask(todo2:string) {
        await this.page.locator(this.newTodoInput).fill(todo2)
        await this.page.locator(this.newSubmitButton).click()
    }

   async getAddNewTaskUsingApi(user: User) {
   await new TodoApi(this.request!).AddTodo(user)
   } 

}
