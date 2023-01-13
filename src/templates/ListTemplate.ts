import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplate implements DOMList {
  static instance: ListTemplate = new ListTemplate();

  ul: HTMLUListElement;

  private constructor() {
    this.ul = document.getElementById("listItems") as HTMLUListElement;
  }

  clear(): void {
    ListTemplate.instance.ul.innerHTML = "";
  }

  render(fullList: FullList): void {
    this.clear();

    fullList.list.forEach((listItem) => {
      let li = document.createElement("li") as HTMLLIElement;
      li.className = "item";

      const check = document.createElement("input") as HTMLInputElement;
      check.type = "checkbox";
      check.id = listItem.id;
      check.checked = listItem.checked;
      li.append(check);

      check.addEventListener("change", () => {
        listItem.checked = !listItem.checked;
        fullList.save();
      });

      const label = document.createElement("label") as HTMLLabelElement;
      label.htmlFor = listItem.id;
      label.textContent = listItem.item;
      li.append(label);

      const button = document.createElement("button") as HTMLButtonElement;
      button.className = "button";
      button.textContent = "X";
      li.append(button);

      this.ul.appendChild(li);
    });

    this.ul.addEventListener("click", (e: Event) => {
      const element = e.target as HTMLButtonElement;
      if (element.tagName === "BUTTON") {
        const input = element
          .closest("li")
          ?.querySelector("input") as HTMLInputElement;
        fullList.remove(input.id);
        this.render(fullList);
      }
    });
  }
}
