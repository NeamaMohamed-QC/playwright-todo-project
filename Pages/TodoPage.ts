import { Page } from "@playwright/test"

export default class TodoPage {

    private page: Page
    constructor(page: Page) {
        this.page = page
    }
    //elements 

    private get welcomeMessage() {
        return this.page.getByTestId("welcome")
    }

    private get todoItem() {
        return '[data-testid="todo-text"]'
    }

    private get deleteIcon() {
        return this.page.getByTestId("delete")
    }

    private get noTodoMessage (){
        return this.page.getByTestId("no-todos")
    }

    //methods
    async load() {
        await this.page.goto("/todo")
    }

    getWelcomeMessage() {
        return this.page.getByTestId("welcome")
    }

    async getTodoTextByIndex(index: number) {
        return await this.page.locator('[data-testid="todo-text"]').nth(index).innerText()
    }
    async getDeleteIconByIndex(index: number){
        return this.page.getByTestId("delete").nth(index).click
    }

    async getNoTodoMessage (){
        return this.page.getByTestId("no-todos")
    }

}