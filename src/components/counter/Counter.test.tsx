import React from "react";
import { render, screen, act } from "@testing-library/react";
import { Counter } from "./Counter";
import userEvent from "@testing-library/user-event";

describe("Counter", () => {
  test("renders correctly", () => {
    render(<Counter />);
    const countElement = screen.getByRole("heading");
    expect(countElement).toBeInTheDocument();
    const incrementButton = screen.getByRole("button", { name: "Increment" });
    expect(incrementButton).toBeInTheDocument();
    const amountInput = screen.getByRole("spinbutton");
    expect(amountInput).toBeInTheDocument();
    const setButton = screen.getByRole("button", { name: "Set" });
    expect(setButton).toBeInTheDocument();
  });

  test("renders a count of 0", () => {
    render(<Counter />);
    const countElement = screen.getByRole("heading");
    expect(countElement).toHaveTextContent("0");
  });

  test("renders a count of 1 after clicking the increment button", async () => {
    const user = userEvent.setup();
    render(<Counter />);
    const incrementButton = screen.getByRole("button", { name: "Increment" });
    await act(async () => {
      await user.click(incrementButton);
    });

    const countElement = await screen.findByRole("heading");

    expect(countElement).toHaveTextContent("1");
  });

  test("renders a count of 2 after clicking the increment button twice", async () => {
    const user = userEvent.setup();
    render(<Counter />);
    const incrementButton = screen.getByRole("button", { name: "Increment" });
    await act(async () => {
      await user.click(incrementButton);
    });
    await act(async () => {
      await user.click(incrementButton);
    });
    const countElement = await screen.findByRole("heading");
    expect(countElement).toHaveTextContent("2");
  });

  test("renders a count of 10 after clicking the set button", async () => {
    const user = userEvent.setup();
    render(<Counter />);
    const amountInput = screen.getByRole("spinbutton");
    await act(async () => {
      await user.type(amountInput, "10");
    });

    expect(amountInput).toHaveValue(10);
    const setButton = screen.getByRole("button", { name: "Set" });
    await act(async () => {
      await user.click(setButton);
    });
    const countElement = screen.getByRole("heading");
    expect(countElement).toHaveTextContent("10");
  });

  test("elements are focused in the right order", async () => {
    const user = userEvent.setup();
    render(<Counter />);
    const amountInput = screen.getByRole("spinbutton");
    const setButton = screen.getByRole("button", { name: "Set" });
    const incrementButton = screen.getByRole("button", { name: "Increment" });
    await act(async () => {
      await user.tab();
    });

    expect(incrementButton).toHaveFocus();
    await act(async () => {
      await user.tab();
    });

    expect(amountInput).toHaveFocus();
    await act(async () => {
      await user.tab();
    });
    expect(setButton).toHaveFocus();
  });
});
