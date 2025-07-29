import { test, expect } from "@playwright/test";

test.describe("Authentication Flow", () => {
  test("should redirect to login page when not authenticated", async ({
    page,
  }) => {
    await page.goto("/dashboard");

    // Should redirect to login page
    await expect(page).toHaveURL("/auth/login");
  });

  test("should show login form", async ({ page }) => {
    await page.goto("/auth/login");

    await expect(page.getByRole("heading", { name: "ログイン" })).toBeVisible();
    await expect(page.getByLabel("メールアドレス")).toBeVisible();
    await expect(page.getByLabel("パスワード")).toBeVisible();
    await expect(page.getByRole("button", { name: "ログイン" })).toBeVisible();
  });

  test("should show register form", async ({ page }) => {
    await page.goto("/auth/register");

    await expect(
      page.getByRole("heading", { name: "アカウント作成" })
    ).toBeVisible();
    await expect(page.getByLabel("名前")).toBeVisible();
    await expect(page.getByLabel("メールアドレス")).toBeVisible();
    await expect(page.getByLabel("パスワード")).toBeVisible();
    await expect(page.getByLabel("パスワード（確認）")).toBeVisible();
    await expect(
      page.getByRole("button", { name: "アカウント作成" })
    ).toBeVisible();
  });

  test("should validate login form", async ({ page }) => {
    await page.goto("/auth/login");

    // Try to submit empty form
    await page.getByRole("button", { name: "ログイン" }).click();

    // Should show validation errors
    await expect(
      page.getByText("有効なメールアドレスを入力してください")
    ).toBeVisible();
    await expect(
      page.getByText("パスワードは6文字以上で入力してください")
    ).toBeVisible();
  });

  test("should validate register form", async ({ page }) => {
    await page.goto("/auth/register");

    // Fill form with invalid data
    await page.getByLabel("名前").fill("");
    await page.getByLabel("メールアドレス").fill("invalid-email");
    await page.getByLabel("パスワード").fill("123");
    await page.getByLabel("パスワード（確認）").fill("different");

    await page.getByRole("button", { name: "アカウント作成" }).click();

    // Should show validation errors
    await expect(page.getByText("名前を入力してください")).toBeVisible();
    await expect(
      page.getByText("有効なメールアドレスを入力してください")
    ).toBeVisible();
    await expect(
      page.getByText("パスワードは6文字以上で入力してください")
    ).toBeVisible();
    await expect(page.getByText("パスワードが一致しません")).toBeVisible();
  });

  test("should navigate between login and register pages", async ({ page }) => {
    await page.goto("/auth/login");

    // Click register link
    await page.getByRole("link", { name: "新規登録" }).click();
    await expect(page).toHaveURL("/auth/register");

    // Click login link
    await page.getByRole("link", { name: "ログイン" }).click();
    await expect(page).toHaveURL("/auth/login");
  });
});
