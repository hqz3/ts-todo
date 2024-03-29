import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(itemObj: ListItem): void;
  remove(id: String): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    let list: string | null = localStorage.getItem("list");

    if (typeof list !== "string") return;

    const parsedList: { _id: string; _item: string; _checked: boolean }[] =
      JSON.parse(list);

    parsedList.forEach((itemObj) => {
      const newListItem = new ListItem(
        itemObj._id,
        itemObj._item,
        itemObj._checked
      );
      // FullList.instance.addItem(newListItem);
      this.addItem(newListItem);
    });
  }

  save(): void {
    localStorage.setItem("list", JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(newListItem: ListItem): void {
    this._list.push(newListItem);
    this.save();
  }

  remove(id: String): void {
    this._list = this._list.filter((item: ListItem) => {
      return item.id !== id;
    });
    this.save();
  }
}
