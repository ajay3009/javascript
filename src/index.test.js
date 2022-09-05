import { fireEvent, getByText } from "@testing-library/dom";
import "@testing-library/jest-dom/extend-expect";
import { JSDOM } from "jsdom";
import fs from "fs";
import path from "path";

const html = fs.readFileSync(path.resolve(__dirname, "./index.html"), "utf8");
const scriptContent = fs.readFileSync(
  path.resolve(__dirname, "./js/script.js"),
  "utf8"
);

let dom;
let container;

describe("index.html", () => {
  beforeAll(() => {
    dom = new JSDOM(html, { resources: "usable", runScripts: "dangerously" });
    let window = dom.window;
    let document = window.document;
    let scriptElement = document.createElement("script");
    scriptElement.textContent = scriptContent;
    document.head.appendChild(scriptElement);
    container = document.body;
  });

  it("renders a heading element", () => {
    expect(container.querySelector("h1")).not.toBeNull();
    expect(getByText(container, "Bridge Game")).toBeInTheDocument();
  });

  it("renders a button element", () => {
    expect(container.querySelector("button")).not.toBeNull();
    expect(getByText(container, "Shuffle")).toBeInTheDocument();
  });

  it("renders hand with 13 cards for west player", () => {
    const cards = container.querySelectorAll("#west div");
    expect(cards.length).toBe(13);
  });

  it("renders hand with 13 cards for south player", () => {
    const cards = container.querySelectorAll("#north div");
    expect(cards.length).toBe(13);
  });

  it("renders hand with 13 cards for south player", () => {
    const cards = container.querySelectorAll("#south div");
    expect(cards.length).toBe(13);
  });

  it("renders hand with 13 cards for east player", () => {
    const cards = container.querySelectorAll("#east div");
    expect(cards.length).toBe(13);
  });

  it("renders shuffle shoud change the hands", () => {
    const button = getByText(container, "Shuffle");
    const oldCards = container.querySelectorAll("#north div");
    fireEvent.click(button);
    const newCards = container.querySelectorAll("#north div");
    expect(newCards.length).toBe(13);
    expect(oldCards[0].textContent).not.toEqual(newCards[0].textContent);
    expect(oldCards[1].textContent).not.toEqual(newCards[1].textContent);
  });

  it("renders each hand should have unique cards", () => {
    const cards = container.querySelectorAll("#north div");
    let isDuplicate = false;
    for (let i = 0; i < cards.length - 1; i++) {
      for (let j = i + 1; j < cards.length; j++) {
        if (cards[i].textContent === cards[j].textContent && !isDuplicate) {
          isDuplicate = true;
        }
      }
    }
    expect(isDuplicate).toBeFalsy();
  });
});
