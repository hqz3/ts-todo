import "./css/style.css";
import ListTemplate from "./templates/ListTemplate";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";

const initApp = (): void => {
  const fullList = FullList.instance;
  const template = ListTemplate.instance;

  const itemEntryForm = document.getElementById(
    "itemEntryForm"
  ) as HTMLFormElement;

  itemEntryForm.addEventListener("submit", (e: SubmitEvent): void => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const input = form.querySelector("input") as HTMLInputElement;

    const newEntryText = input.value.trim();
    if (!newEntryText) return;

    const newListItem = new ListItem(Date.now().toString(), newEntryText);
    fullList.addItem(newListItem);
    template.render(fullList);
    input.value = "";
  });

  const clearItems = document.getElementById(
    "clearItemsButton"
  ) as HTMLButtonElement;
  clearItems.addEventListener("click", (): void => {
    fullList.clearList();
    template.clear();
  });

  fullList.load();
  template.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
