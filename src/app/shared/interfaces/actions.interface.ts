export interface IAction {
  id: number | string;
  date: string;
  name: string;
  title: string;
  description: string;
  image: string;
}

export interface IActionRequest {
  date: string;
  name: string;
  title: string;
  description: string;
  image: string;
}

export interface IActionResponse extends IActionRequest {
  id: number | string;
}
